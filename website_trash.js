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