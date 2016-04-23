// vizObj
var vizObj = {
    textColour: "#797979",
    titleFontSize: 27,
    margin: 10
};

// voronoi function for this sample
var voronoi = d3.geom.voronoi();

// get voronoi vertices
var vertices = _getVoronoiVertices(vizObj, 3); // x, y, real_cell
var vertex_coords = vertices.map(function(vertex) { // ready for voronoi function
    return [vertex.x, vertex.y];
});
var paths = voronoi(vertex_coords).map(function(path_points) {
    return {
        path: _polygon(path_points)
    };
});
console.log("paths");
console.log(paths);

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


// plot cells
var cells = svg.append("g")
    .classed("cellsG", true)
    .selectAll("path")
    .data(paths)
    .enter().append("path")
    .attr("id", function(d, i) { 
        d.id = "voronoiCellPath_" + i;
        return d.id; 
    })
    .attr("class", "voronoiCell")
    .attr("d", function(d) {
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
    })


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

        // publications
        if (thisTitle == "Publications") {
            window.open("https://scholar.google.com/citations?view_op=list_works&hl=en&user=J8844tYAAAAJ&gmla=AJsN-F4WM8ISYnDVhcN0sGvNM59w-d-dy4wZsYu_WB6Ifs_31fUz8TEKS72Rom9gDMFhL-2UF0RvHdjXXlrylPNcX7UFevfoZAqs-AySzMU6gi8ErcyG62k");
        }

        else {

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
                .duration(300)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0.1)
                .attr("stroke", "#D6D5D5");

            // for each title, act accordingly
            if (thisTitle == "Music") {
                setTimeout(function() {
                    d3.select("svg")
                        .append("text")  
                        .attr("x", width/2)
                        .attr("y", height/2 - (vizObj.titleFontSize + 50))
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .style("cursor", "pointer")
                        .text("SoundCloud")
                        .on("click", function() { // open soundcloud
                            window.open("https://soundcloud.com/maia-smith-549730900"); 
                        })
                        .on("mouseover", function() {
                            // title text colour darker
                            d3.select(this).attr("fill", "black");
                        })
                        .on("mouseout", function(d) {
                            // title text colour reset
                            d3.select(this).attr("fill", vizObj.textColour);
                        })
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                    d3.select("svg")
                        .append("text")
                        .attr("x", width/2)
                        .attr("y", height/2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .style("cursor", "pointer")
                        .text("YouTube")
                        .on("click", function() {
                            window.open("https://www.youtube.com/playlist?list=PLsGgSSlBeTOLzBptf24sOKODSgGfj7B6_"); 
                        })
                        .on("mouseover", function() {
                            // title text colour darker
                            d3.select(this).attr("fill", "black");
                        })
                        .on("mouseout", function(d) {
                            // title text colour reset
                            d3.select(this).attr("fill", vizObj.textColour);
                        })
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                }, 1000);
            }

            if (thisTitle == "Contact") {
                setTimeout(function() {
                    d3.select("svg")
                        .append("text")  
                        .attr("x", width/2)
                        .attr("y", height/2 - (vizObj.titleFontSize + 50))
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .style("cursor", "pointer")
                        .text("778-580-7586")
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                    d3.select("svg")
                        .append("text")
                        .attr("x", width/2)
                        .attr("y", height/2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .style("cursor", "pointer")
                        .text("maiaannesmith@gmail.com")
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                    d3.select("svg")
                        .append("text")
                        .attr("x", width/2)
                        .attr("y", height/2 + (vizObj.titleFontSize + 50))
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .style("cursor", "pointer")
                        .text("LinkedIn")
                        .on("click", function() { 
                            window.open("https://www.linkedin.com/in/maia-smith-15710771"); 
                        })
                        .on("mouseover", function() {
                            // title text colour darker
                            d3.select(this).attr("fill", "black");
                        })
                        .on("mouseout", function(d) {
                            // title text colour reset
                            d3.select(this).attr("fill", vizObj.textColour);
                        })
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                        
                }, 1000);

            }
        }


    }

    return false
});
