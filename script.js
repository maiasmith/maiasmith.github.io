// vizObj
var vizObj = {
    textColour: "#797979",
    titleFontSize: 27,
    margin: 10
};

// get voronoi vertices
var vertices = _getVoronoiVertices(vizObj, 3); // x, y, real_cell
var vertex_coords = vertices.map(function(vertex) { // ready for voronoi function
    return [vertex.x, vertex.y];
});

// fill the first vertices with page titles (e.g. "About", etc.)
var titles = ["About", "CV", "Projects", "Publications", 
    "Music", "Photography", "Contact"];

// page setup
var width = window.innerWidth,
    height = window.innerHeight;

var nColours = 3;
var colour = colorbrewer.Set3[nColours];
var colour_dimmer = colour.map(function(col) {
    return _decrease_brightness(col, 15);
});
var colour_brighter = colour.map(function(col) {
    return _increase_brightness(col, 25);
});

// svgs
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// voronoi function for this sample
var voronoi = d3.geom.voronoi();
console.log("voronoi(vertex_coords)");
console.log(voronoi(vertex_coords));

// plot cells
var cells = svg.append("g")
    .classed("cellsG", true)
    .selectAll("path")
    .data(voronoi(vertex_coords), _polygon)
    .enter().append("path")
    .attr("id", function(d, i) { 
        d.id = "voronoiCellPath_" + i;
        return d.id; 
    })
    .attr("class", "voronoiCell")
    .attr("d", function(d) {
        d.path = _polygon(d);
        return d.path;
    })
    .attr("fill", function(d, i) {
        d.randInt = i % nColours;
        return colour[d.randInt];
    })
    .attr("stroke", "#D6D5D5")
    .attr("stroke-width", "5px")
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 1)
    .on("mouseover", function(d, i) {
        // move this cell to the front
        var sel = d3.select(this);
        sel.moveToFront();

        // increase brightness of cell
        d3.select(this).attr("fill", function(d) {
            return colour_brighter[d.randInt];
        })
    })
    .on("mouseout", function(d, i) {
        // return cell brightness to normal
        d3.select(this).attr("fill", function(d) {
            return colour[d.randInt];
        })
    });

// plot titles

var titles = svg.append("g")
    .attr("class", "titlesG")
    .selectAll("title")
    .data(titles)
    .enter().append("text")
    .attr("x", vizObj.margin)
    .attr("y", function(d, i) { return vizObj.margin + i*(vizObj.titleFontSize+5); }) // 10 for space at top
                                                                   // 5 for spacing between titles
    .attr("dy", "+0.71em")
    .attr("class", "title")
    .attr("font-size", vizObj.titleFontSize)
    .attr("font-family", "Arial")
    .attr("fill", vizObj.textColour)
    .attr("fill-opacity", 1)
    .style("cursor", "pointer")
    .text(function(d) { return d.toUpperCase().split("").join(" "); })
    .on("mouseover", function(d) {
        // title text colour darker
        d3.select(this).attr("fill", "black");
    })
    .on("mouseout", function(d) {
        // title text colour reset
        d3.select(this).attr("fill", vizObj.textColour);
    });

var flag = false;
$(".title").bind('touchstart click', function(){
    if (!flag) {
        flag = true;
        setTimeout(function(){ flag = false; }, 100);

        var thisTitle = d3.select(this).data();

        // fade out other titles
        d3.selectAll(".title")
            .transition()
            .duration(500)
            .attr("fill-opacity", function(d) {
                return (d == thisTitle) ? 1 : 0;
            });

        // move all titles to top of page
         d3.selectAll(".title")
            .transition()
            .delay(500)
            .duration(800)
            .attr("y", vizObj.margin);  

        // fade out all voronoi cells
        d3.selectAll(".voronoiCell")
            .transition()
            .delay(function(d,i) { return i * 10; })
            .duration(1250)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0.1)
            .attr("stroke", "#D6D5D5");
    }

    return false
});
