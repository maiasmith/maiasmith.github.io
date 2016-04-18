// vizObj
var curVizObj = {
    textColour: "#797979"
};

// get voronoi vertices
var vertices = _getVoronoiVertices(curVizObj, 3); // x, y, real_cell
var vertex_coords = vertices.map(function(vertex) { // ready for voronoi function
    return [vertex.x, vertex.y];
});

// fill the first vertices with page titles (e.g. "About", etc.)
var titles = ["About", "Curriculum Vitae", "Projects", "Contact", "Music", "Photography"];
titles.forEach(function(title, title_i) {
    vertices[title_i]["title"] = title;
})
console.log("vertices");
console.log(vertices);

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
console.log(colour);
console.log(colour_dimmer);
console.log(colour_brighter);

// svgs
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// voronoi function for this sample
var voronoi = d3.geom.voronoi();

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
    .attr("d", _polygon)
    .attr("fill", function(d, i) {
        d.randInt = Math.round(_random(curVizObj) * (nColours-1));
        return colour[d.randInt];
    })
    .attr("stroke", function(d, i) {
        return colour_dimmer[d.randInt];
    })
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

        // darken text
        d3.select(".textPath_" + i).attr("fill", "black");
    })
    .on("mouseout", function(d, i) {
        // return cell brightness to normal
        d3.select(this).attr("fill", function(d) {
            return colour[d.randInt];
        })

        // reset text colour
        d3.select(".textPath_" + i).attr("fill", curVizObj.textColour);
    })
    .on("click", function(d, i) {
        var this_cell_id = d.id;  // identifier for this cell

        d3.selectAll(".voronoiCell")
            .transition()
            .delay(function(d,i) { return i * 20; })
            .duration(1250)
            .attr('fill-opacity', function(d) {
                return (d.id == this_cell_id) ? 1 : 0; // only keep this cell that was clicked on
            })
            .attr('stroke-opacity', function(d) {
                return (d.id == this_cell_id) ? 1 : 0.2; // only keep this cell that was clicked on
            })
            .attr("stroke", function(d) {
                return (d.id == this_cell_id) ? colour_dimmer[d.randInt] : "#D6D5D5";
            });
    })

// plot titles
var titles = svg.append("g")
    .attr("class", "titlesG")
    .selectAll("title")
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
