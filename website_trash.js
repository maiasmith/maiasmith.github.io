window.onload = function() {
    var date = new Date();
    var greeting_element = document.getElementById("greeting");
    document.getElementById("greeting").innerHTML = getGreeting(date);
}

function getGreeting(date) {
    var hours = date.getHours();
    if (hours < 12) {
        return "Good morning!"
    }
    else if (hours < 6) {
        return "Good afternoon!"
    }
    else {
        return "Good night!"
    }
    return "hi";
}

        <ul id="nav_container">
            <li><a href="about.html">About</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="cv.html">CV</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>


// network representation


var graph = {
  "nodes":[
    {"name":"Home"},
    {"name":"CV"},
    {"name":"Projects"},
    {"name":"About"},
    {"name":"Contact"}
  ],
  "links":[
    {"source":0,"target":1,"weight":1},
    {"source":0,"target":2,"weight":1},
    {"source":0,"target":3,"weight":1},
    {"source":0,"target":4,"weight":1}
  ]
}


var force = d3.layout.force()
    .charge(-320)
    .linkDistance(130)
    .size([width, height]);

force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link");

var nodeG = svg.selectAll(".nodeG")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "nodeG");

nodeG.append("circle")
    .attr("class", "node")
    .attr("r", 55)
    .attr("fill", function(d, i) { return color(i); })
    .on("mouseover", function(d, i) {
        // lighten the fill colour
        d3.select(this).attr("fill", function() {
            return _increase_brightness(color(i), 20);
        });
    })
    .on("mouseout", function(d, i) {
        // reset fill colour
        d3.select(this).attr("fill", function() { return color(i); });
    })
    .call(force.drag);

nodeG.append("text")
    .attr("class", "nodeText")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .attr("pointer-events", "none")
    .attr("dy", "+0.35em")
    .text(function(d) { return d.name; });

force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodeG.selectAll(".node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    nodeG.selectAll(".nodeText")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
});


// in  CSS


.left_column {
    margin-right: 170px;
}

.right_column {
    float: right;
    width: 160px;
}

#nav_container {
    margin-bottom: 15px;
    list-style-type: none;
}

ul li {
    display: inline-block;
}

li a {
    display: inline-block;
    text-decoration: none;
    padding: 5px;
    color: black;
    background-color: #4EA791;
}

a:hover {
    background-color: #7BC8B5;
}



/* network */
.link {
  stroke: #aaa;
}

.node text {
    stroke:#333;
    cursos:pointer;
}

.node circle{
    stroke:#fff;
    stroke-width:3px;
    fill:#555;
}






function _getVoronoiVertices(curVizObj, cx, cy, seed) {
    var dim = curVizObj.generalConfig;

    // set seed in curVizObj
    curVizObj.seed = seed;

    // voronoi vertices 
    var circleRadius = ($(window).width() > $(window).height()) ? $(window).height()/2 : $(window).width()/2;
    var pageWidth = $(window).width();
    var pageHeight = $(window).height();
    var n_real_cells = 1;
    var n_cells_to_plot = 100;
    var vertices = [];
    while (n_real_cells <= n_cells_to_plot) {
        var x = (cx - pageWidth/2) + (_random(curVizObj) * pageWidth); 
        var y = (cy - pageHeight/2) + (_random(curVizObj) * pageHeight);
        var dist = Math.sqrt(Math.pow(x-cx, 2) + Math.pow(y-cy, 2));
        var inside_circle = (dist < circleRadius);
        if (inside_circle) {
            n_real_cells++;
        }
        vertices.push({x: x, y: y, real_cell: inside_circle});
    }

    return vertices;
}



// regular text
// plot titles
var titles = svg.append("g")
    .attr("class", "titlesG")
    .selectAll("title")
    .data(vertices.slice(0,titles.length))
    .enter().append("text")
    .attr("class", "title")
    .attr("x", function(d) {
        return d.x;
    })
    .attr("y", function(d) {
        return d.y;
    })
    .attr("dy", "+0.35em")
    .attr("text-anchor", "middle")
    .attr("font-family", "Arial")
    .attr("pointer-events", "none")
    .attr("fill", "black")
    .text(function(d) { return d.title.toUpperCase(); });




        // if it's a key cell
        console.log("i = " + i + " titles.length " + titles.length);
        if (i < titles.length) {



             .data(vertices.slice(0,titles.length))
    .enter().append("text")
    .append("textPath")
    .attr("class", function(d, i) { return "textpath_" + i; })
    .attr("xlink:href", function(d, i) { return "#voronoiCellPath_" + i; })
    .attr("font-size", "20px")
    .attr("font-family", "Arial")
    .attr("pointer-events", "none")
    .attr("fill", curVizObj.textColour)
    .text(function(d) { return d.title.toUpperCase().split("").join(" "); });

    // .on("click", function(d) {
    //     var thisTitle = d;

    //     // fade out other titles
    //     d3.selectAll(".title")
    //         .transition()
    //         .duration(800)
    //         .attr("fill-opacity", function(d) {
    //             return (d == thisTitle) ? 1 : 0;
    //         })
    //         .attr("y", vizObj.margin);
    // });

// keep only the voronoi cell that was clicked on
        d3.selectAll(".voronoiCell")
            .transition()
            .delay(function(d,i) { return i * 7; })
            .duration(1250)
            .attr('fill-opacity', function(d) {
                return (d.id == this_cell_id) ? 1 : 0; // only keep this cell that was clicked on
            })
            .attr('stroke-opacity', function(d) {
                return (d.id == this_cell_id) ? 1 : 0.2; // only keep this cell that was clicked on
            })
            .attr("stroke", function(d) {




// every 5 seconds, update voronoi vertices
window.setInterval(function(){
    // modify vertices
    vertex_coords = vertex_coords.map(function(coord) {
        return [coord[0] + (Math.random() * 5 - 1), 
                coord[1] + (Math.random() * 5 - 1)]
    });

    console.log("new coords");
    console.log(vertex_coords[0]);

    console.log("de selection");
    console.log(d3.selectAll(".voronoiCell"));

    // update voronoi plot
    var updatedCells = d3.select(".cellsG").selectAll(".voronoiCell")
        .data(voronoi(vertex_coords), _polygon);
    updatedCells.enter().append("path");
    updatedCells
            .transition()
            .duration(1000)
            .attrTween("d", _pathTween(vizObj));

    // updatedCells
    //     .attr("id", function(d, i) { 
    //         d.id = "voronoiCellPath_" + i;
    //         return d.id; 
    //     })
    //     .attr("class", "voronoiCell")
    //     .attr("d", _polygon)
    //     .attr("fill", function(d, i) {
    //         d.randInt = i % nColours;
    //         return colour[d.randInt];
    //     })
    //     .attr("stroke", "#D6D5D5")
    //     .attr("stroke-width", "5px")
    //     .attr("fill-opacity", 1)
    //     .attr("stroke-opacity", 1)
    // updatedCells.exit().remove();



}, 3000);
                return (d.id == this_cell_id) ? colour_dimmer[d.randInt] : "#D6D5D5";
            });






// modify vertices
console.log("before");
console.log(d3.selectAll('.voronoiCell'));
setTimeout(function() {
    new_vertex_coords = vertex_coords.map(function(coord) {
        return [coord[0] + (Math.random() * 5 - 1), 
                coord[1] + (Math.random() * 5 - 1)]
    });

    var sweeps = d3.selectAll('.voronoiCell')
        .data(voronoi(new_vertex_coords), _polygon);    

    sweeps
        .transition()
        .duration(1000)
        .attrTween("d", function() {
            console.log("hi"); _pathTween(vizObj)
        });

    console.log("after");
    console.log(d3.selectAll('.voronoiCell'));
}, 1000)


/* tween function to transition to the next path ("path" in the data)
* @param {Object} curVizObj
* Note: situations other than "move" - could be an exit situation, where the next path is blank
*/
function _pathTween(curVizObj) { 
    
    var precision = 4;

    return function() {
        var dest_path,
            path0,
            path1,
            n0, 
            n1,
            distances,
            points,
            p0,
            p1;

        // for an exit situation, the path to move to is a line in the centre of the timesweep svg
        dest_path = this.__data__.path; 
        console.log("dest_path = " + dest_path);
        path0 = this;
        path1 = path0.cloneNode();
        n0 = path0.getTotalLength();
        n1 = (path1.setAttribute("d", dest_path), path1).getTotalLength();

        // Uniform sampling of distance based on specified precision.
        distances = [0], i = 0, dt = precision / Math.max(n0, n1);
        while ((i += dt) < 1) distances.push(i);
        distances.push(1);
        // Compute point-interpolators at each distance.
        points = distances.map(function(t) {
            p0 = path0.getPointAtLength(t * n0);
            p1 = path1.getPointAtLength(t * n1);
            return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
        return function(t) {
            return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : dest_path;
        };
    };
}

        // var cur_path = d.path;
        // var next_path = d.path2;
        // d3.select(this)
        //     .call(transition, cur_path, next_path);



        // morph all voronoi cells
        d3.selectAll(".voronoiCell").forEach(function(d) {
            console.log(d);
            

        })




function pathTween(d1, precision) {
  return function() {
    var path0 = this,
        path1 = path0.cloneNode(),
        n0 = path0.getTotalLength(),
        n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

    // Uniform sampling of distance based on specified precision.
    var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
    while ((i += dt) < 1) distances.push(i);
    distances.push(1);

    // Compute point-interpolators at each distance.
    var points = distances.map(function(t) {
      var p0 = path0.getPointAtLength(t * n0),
          p1 = path1.getPointAtLength(t * n1);
      return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
    });

    return function(t) {
      return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
    };
  };
}


function transition(path, d0, d1) {
  path.transition()
      .duration(2000)
      .attrTween("d", pathTween(d1, 4));
}


        else if (thisTitle == "About") {
            var newPaths = paths.map(function(path) {
                return {path: path.path2};
            })
            console.log('newPaths');
            console.log(newPaths);

            var sweeps = d3
                .selectAll('.voronoiCell')
                .data(newPaths)

            // sweeps
            //     .transition()
            //     .duration(1000)
            //     .attrTween("d", _pathTween());

        }


        
        else if (thisTitle == "Publications") {
            d3.select("svg")
                .append("text")
                .attr("id", "rectResize")
                .attr("class", "wrap")
                .attr("x", width/2)
                .attr("y", height/2)
                .attr("text-anchor", "middle")
                .attr("font-size", vizObj.titleFontSize)
                .attr("font-family", "Arial")
                .attr("fill", vizObj.textColour)
                .attr("fill-opacity", 0)
                .text("Brodie, B.S., M. Smith*, J. Lawrence*, and G. Gries. 2015. Effects of floral scent, color and pollen on foraging decisions and ovary development of the common green bottle flies. PloS ONE 10(12): e0145055. DOI:10.1371/journal.pone.0145055")
                .on("click", function() {
                    window.open("http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0145055")
                })
                .transition()
                .duration(500)
                .attr("fill-opacity", 1);

            d3plus.textwrap()
                .container(d3.select("#rectResize"))
                .resize(true)
                .draw();
        }


        function _pathTween() { 
    
    var precision = 4;

    return function() {
        var dest_path,
            path0,
            path1,
            n0, 
            n1,
            distances,
            points,
            p0,
            p1;

        dest_path = this.__data__.path; 
        path0 = this;
        path1 = path0.cloneNode();
        n0 = path0.getTotalLength();
        n1 = (path1.setAttribute("d", dest_path), path1).getTotalLength();

        // Uniform sampling of distance based on specified precision.
        distances = [0], i = 0, dt = precision / Math.max(n0, n1);
        while ((i += dt) < 1) distances.push(i);
        distances.push(1);
        // Compute point-interpolators at each distance.
        points = distances.map(function(t) {
            p0 = path0.getPointAtLength(t * n0);
            p1 = path1.getPointAtLength(t * n1);
            return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
        return function(t) {
            return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : dest_path;
        };
    };
}

        if (i == 0) {
        return "M74.06329990575145,227.84191869186833L95.82514518103439,246.65045372918325L171.95139089660867,208.30359238255969L181.94774166390536,192.27127721375996L122.46457502912455,123.61504373335325Z"
        }
        else {
        return "M490.23640329369863,216.51439138685006L562.9299154182522,216.8424696079265L568.7008343535373,117.99761554303268L493.4470847985082,166.7441569861568Z"
        }