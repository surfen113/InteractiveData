function loadJS() {
    init();
    bargraph();
    linegraph();
}

function init() {
    //Width and height
    var w = 1000;
    var h = 1000;

    var projection = d3.geoMercator()
        .translate([0, 0])
        .scale(1);

    //Define path generator
    var path = d3.geoPath()
        .projection(projection);

    //Create SVG element
    var svg = d3.select("#l1")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    //
    // set the ranges
    var x = d3.scaleBand()
        .range([0, w])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([h, 0]);

    //Load in GeoJSON data
    d3.json("json/sfpd_districts.geojson", function (json) {


        var b = path.bounds(json),
            s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
            t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            //.attr("transform", "translate(-800,200)")
            .style("fill", "red")
            .style("stroke", "#fff")
            .style("stroke-width", "3")
            .style("fill", function (d) {

                // Get data value
                var value = d.properties.visited;
                return "rgb(213,222,217)";

            });

        // put boarder around states
        // svg.append("path")
        //     .datum(topojson.mesh(json, json.properties.district, function(a, b) { return a !== b; }))
        //     .attr("class", "mesh")
        //     .attr("d", path);
        //

        d3.json("json/sf_crime.geojson", function (json) {

            // add circles to svg
            svg.selectAll("circle")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                // .append("circle")
                // .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
                // .attr("cy", function (d) { return projection(d)[1]; })
                // .attr("r", "8px")
                .attr("fill", "steelblue")
        });
    });
}


function bargraph() {

    var margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = 1500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .paddingInner(.1)
        .paddingOuter(.3);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            return "<strong>Category: </strong> <span style='color:red'>" + d.key + "</span>" + "<br /><strong>Total crimes: </strong> <span style='color:red'>" + d.values.length + "</span>";
        });
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg1 = d3.select("#l2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg1.call(tip);

    d3.json("json/sf_crime.geojson", function (json) {

        var categories = d3.nest()
            .key(function (d) {
                return d.properties.Category;
            })
            .sortKeys(d3.ascending)
            .entries(json.features);

        // format the data
        categories.forEach(function (d) {
            d.key = d.key;
            d.values.length = +d.values.length;
        });

        // Scale the range of the data in the domains
        x.domain(categories.map(function (d) {
            return d.key;
        }));
        y.domain([0, d3.max(categories, function (d) {
            return d.values.length;
        })]);

        // append the rectangles for the bar chart
        svg1.selectAll(".bar")
            .data(categories)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.key);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.values.length);
            })
            .attr("height", function (d) {
                return height - y(d.values.length);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // add the x Axis
        svg1.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(0," + height + 100 + ")")
            .attr("transform", "rotate(-45)");

        // add the y Axis
        svg1.append("g")
            .call(d3.axisLeft(y));
    });
}

function sortByTimeAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a - b;
}

function linegraph() {

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

// parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

// set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.key); })
        .y(function(d) { return y(d.values.length); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg3 = d3.select("#l3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.json("json/sf_crime.geojson", function (json) {

        var data = d3.nest()
            .key(function (d) {
                var date = parseTime(d.properties.Dates);
                return +date.getHours();
            })
            .sortKeys(sortByTimeAscending)
            .entries(json.features);

        // format the data
        data.forEach(function (d) {
            d.key = d3.timeParse("%H")(d.key);
            d.values.length = +d.values.length;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.key; }));
        y.domain([0, d3.max(data, function(d) { return d.values.length; })]);

        // Add the valueline path.
        svg3.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the scatterplot
        svg3.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return x(d.key); })
            .attr("cy", function(d) { return y(d.values.length); });

        // Add the X Axis
        svg3.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg3.append("g")
            .call(d3.axisLeft(y));

    });
}