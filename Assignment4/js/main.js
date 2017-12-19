function loadJS() {
    plotPCA();
    plotHand();
}

function plotHand(k, width, height, g) {

    d3.text("hands.csv",
        function(error, data) {
            if (error) throw error;

            var hands = d3.csvParseRows(data).map(function (value) {
                return value.map(function (value2) {
                    return +value2;
                })
            });

            var hand = hands[k];

            var xval = d3.map(hand).values().slice(0, 56);
            var yval = d3.map(hand).values().slice(56, 112);

            var x = d3.scaleLinear()
                .range([0,width]);

            var y = d3.scaleLinear()
                .range([height,0]);

            var final = d3.zip(xval, yval);

            var line = d3.line()
                .x(function (d) {
                    return x(d[0]);
                })
                .y(function (d) {
                    return y(d[1]);
                })
                .curve(d3.curveCatmullRom);

            console.log(g);

            g.select('path').transition().duration(250).attr('d', line(final));
        });
}

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

    var svg_hands = d3.select("#graph2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var g = svg_hands.append('g');

    g.append('path')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "hand");

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

        var isClicked = false;

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
            .attr("pointer-events", "all")

            //Draw Hand onClick
            .on("click", function (d, i) {
                d3.selectAll("circle").attr("r", 5).style("fill", "black");
                d3.select(this).attr("r", 10).style("fill", "red");
                i = i + 1;
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Hand # " + i)// + "<br/>" + (d.x) + "x <br/>" + d.y + "y")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 18) + "px");
                plotHand(i-1, width, height, g);
                isClicked = true;
            })
            //Add tooltip
            .on("mouseover", function (d, i) {
                d3.select(this).attr("r", 5).style("fill", "orange");
                i = i + 1;
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Hand # " + i)// + "<br/>" + (d.x) + "x <br/>" + d.y + "y")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 18) + "px");
                isClicked = false;
            })
            .on("mouseout", function (d) {
                if(!isClicked) {
                    d3.select(this).attr("r", 5).style("fill", "black");
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                }
            });

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        plotHand(0, width, height, g);

    });
}

