// vizObj
var vizObj = {
    textColour: "#797979",
    titleFontSize: 27,
    margin: 10,
    flag: false,
    onMainMenu: true // whether or not we're on the main menu
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

// fill the first vertices with page titles (e.g. "CV", etc.)
var titles = ["CV", "Projects", "Publications", 
    "Music", "Contact"];

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
    .attr("stroke-opacity", 1);


// plot titles

var titles = svg.append("g")
    .attr("class", "titlesG")
    .selectAll("title")
    .data(titles)
    .enter().append("text")
    .attr("x", width/2)
    .attr("y", function(d, i) { 
        // 5 for spacing between titles
        return vizObj.margin + i*(vizObj.titleFontSize+5); 
    }) 
    .attr("dy", "+0.71em")
    .attr("class", function(d) {
        return "title title_" + d;
    })
    .attr("text-anchor", "middle")
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

// back button
var backButtonIcon_base64 = "data:image/svg+xml;base64," + "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzA2IDMwNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA2IDMwNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJjaGV2cm9uLWxlZnQiPgoJCTxwb2x5Z29uIHBvaW50cz0iMjQ3LjM1LDM1LjcgMjExLjY1LDAgNTguNjUsMTUzIDIxMS42NSwzMDYgMjQ3LjM1LDI3MC4zIDEzMC4wNSwxNTMgICAiIGZpbGw9IiM3OTc5NzkiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
var backButtonIcon_height = 19;
svg.append("image")
    .attr("class", "backButtonIcon")
    .attr("xlink:href", backButtonIcon_base64)
    .attr("x", vizObj.margin)
    .attr("y", vizObj.margin)
    .attr("height", backButtonIcon_height)
    .attr("width", backButtonIcon_height)
    .attr("opacity", 0)
    .on("mouseover", function() {
        // if title is selected
        if (!vizObj.onMainMenu) {
            d3.select(this).attr("opacity", 1);            
        }
    })
    .on("mouseout", function() {
        // if title is selected
        if (!vizObj.onMainMenu) {
            d3.select(this).attr("opacity", 0.5);
        }
    })
    .on("click", function() {
        // if title is selected
        if (!vizObj.onMainMenu) {
            // return titles to their original place
            d3.selectAll(".title")
                .transition()
                .duration(500)
                .attr("x", width/2)
                .attr("y", function(d, i) { 
                    // 5 for spacing between titles
                    return vizObj.margin + i*(vizObj.titleFontSize+5); 
                }) 
                .attr("fill-opacity", 1);

            // we're now on the main menu
            vizObj.onMainMenu = true;

            // hide back button
            d3.select(this).attr("opacity", 0);

            // remove all items not on main menu
            d3.selectAll(".notMainMenu").remove();

            // fade in all voronoi cells
            d3.selectAll(".voronoiCell")
                .transition()
                .duration(300)
                .attr('fill-opacity', 1)
                .attr('stroke-opacity', 1);
        }
    })

$(".title").bind('touchstart click', function(){
    if (!vizObj.flag) {
        vizObj.flag = true;
        setTimeout(function(){ vizObj.flag = false; }, 100);

        // no longer on the main menu
        vizObj.onMainMenu = false;

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

            // move this title to top left of page
            d3.selectAll(".title_" + thisTitle)
                .transition()
                .delay(500)
                .duration(800)
                .attr("y", vizObj.margin)
                .attr("x", function() {
                    return vizObj.margin + backButtonIcon_height + vizObj.margin + 
                        this.getComputedTextLength()/2;
                });  

            // fade in back button
            d3.select(".backButtonIcon")
                .transition()
                .delay(500)
                .duration(500)
                .attr("opacity", 0.5)

            // fade out all voronoi cells
            d3.selectAll(".voronoiCell")
                .transition()
                .delay(function(d,i) { return i * 10; })
                .duration(300)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0.1);

            // for each title, act accordingly
            if (thisTitle == "Music") {
                setTimeout(function() {
                    d3.select("svg")
                        .append("text")
                        .attr("class", "notMainMenu")  
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
                        .attr("class", "notMainMenu") 
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
                        .attr("class", "notMainMenu") 
                        .attr("x", width/2)
                        .attr("y", height/2 - (vizObj.titleFontSize + 50))
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .text("778-580-7586")
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                    d3.select("svg")
                        .append("text")
                        .attr("class", "notMainMenu") 
                        .attr("x", width/2)
                        .attr("y", height/2)
                        .attr("text-anchor", "middle")
                        .attr("font-size", vizObj.titleFontSize)
                        .attr("font-family", "Arial")
                        .attr("fill", vizObj.textColour)
                        .attr("fill-opacity", 0)
                        .text("maiaannesmith@gmail.com")
                        .transition()
                        .duration(500)
                        .attr("fill-opacity", 1); 
                    d3.select("svg")
                        .append("text")
                        .attr("class", "notMainMenu") 
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
