// FUNCTIONS

// GREETING FUNCTIONS

// window.onload = function() {
//     var date = new Date();
//     var greeting_element = document.getElementById("greeting");
//     document.getElementById("greeting").innerHTML = getGreeting(date);
// }

// function getGreeting(date) {
//     var hours = date.getHours();
//     if (hours < 12) {
//         return "Good morning!"
//     }
//     else if (hours < 6) {
//         return "Good afternoon!"
//     }
//     else {
//         return "Good night!"
//     }
//     return "hi";
// }

// D3 FUNCTIONS

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};


// COLOUR FUNCTIONS

// function to increase brightness of hex colour
// from: http://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour
function _increase_brightness(hex, percent){
    console.log("increasing");
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

// function to decrease brightness of hex colour
// from: http://stackoverflow.com/questions/12660919/javascript-brightness-function-decrease
function _decrease_brightness(hex, percent){
    var r = parseInt(hex.substr(1, 2), 16),
        g = parseInt(hex.substr(3, 2), 16),
        b = parseInt(hex.substr(5, 2), 16);

   return '#' +
       ((0|(1<<8) + r * (100 - percent) / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g * (100 - percent) / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b * (100 - percent) / 100).toString(16)).substr(1);
}

// VORONOI FUNCTIONS

/* function to get voronoi vertices for this anatomic sample (randomly fill a rectangle, keeping all within a certain 
* radius from the centre as "real cells", all others as "fake cells") 
* @param {Object} vizObj -- vizObj for the current view 
* @param {Number} seed -- seed for random generator TODO !!!!!!!!!!!!!!!!!!!! works when seed is set to 20, but not when it's the sample index
*/
function _getVoronoiVertices(vizObj, seed) {
    var dim = vizObj.generalConfig;

    // set seed in vizObj
    vizObj.seed = seed;

    // voronoi vertices 
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var circleRadius = (windowWidth > windowHeight) ? windowWidth/2 : windowWidth/2;
    var pageWidth = windowWidth;
    var pageHeight = windowHeight;
    var n_cells_to_plot = 60;
    var vertices = [];
    for (var i = 0; i < n_cells_to_plot; i++) {
        var x = _random(vizObj) * pageWidth; 
        var y = _random(vizObj) * pageHeight;
        vertices.push({x: x, y: y});
    }

    return vertices;
}

function _polygon(d) {
  return "M" + d.join("L") + "Z";
}

// GENERAL FUNCTIONS

/* random number generator [0,1], 
* from http://stackoverflow.com/questions/521295/javascript-random-seeds
* @param {Object} vizObj -- vizObj for the current view
*/
function _random(vizObj) {
    var x = Math.sin(vizObj.seed++) * 10000;
    return x - Math.floor(x);
}


