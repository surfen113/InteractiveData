d3.select(window).on('load', init);


function init() {
    //Width and height
    var w = 2000;
    var h = 1000;

    var projection = d3.geoMercator()
        .translate([0, 0])
        .scale(1);

    //Define path generator
    var path = d3.geoPath()
        .projection(projection);

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

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