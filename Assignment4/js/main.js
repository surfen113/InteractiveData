function loadJS() {
    plotPCA();
};


function plotPCA() {

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 750 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


    var svg = d3.select("#graph1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    d3.csv("hands_pca.csv", function (error, data) {

        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.x = +d["A"];
            d.y = +d["B"];
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.x;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.y;
        }));

        // Add the valueline path.
        // svg.append("path")
        //     .data([data])
        //     .attr("class", "line")
        //     .attr("d", valueline);

        // Add the scatterplot

        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            })
            .text(function (d, i) {
                i = +i;
                return "Hand: " + (i + 1);
            })

            //Add tooltip
            .on("mouseover", function (d,i) {
                i = i + 1;
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Number: " + i + "<br/>" + (d.x) + "x <br/>" + d.y + "y" )
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });
}

