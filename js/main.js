function load_charts() {
    load_chart1();
    load_chart2();
};

var margin = {top: 20, right: 20, bottom: 70, left: 70},
    width = 1150 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


function load_chart1() {


    var parseTime = d3.timeParse("%Y");

    
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    
    var svg = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data.csv", function (error, data) {

        data.forEach(function (d) {
            d.metANN = +d["metANN"];
            //d.year = parseTime(d.YEAR);
            d.year = +d["YEAR"];
        });

        x.domain(data.map(function (d) {
            return d.year;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.metANN;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            //.call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");
        
        
        svg.append("g")
            .attr("class", "y axis")
            //.call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axistext")
            .text("Mean Annual Temperature (in °C)");

        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function (d) {
                return x(d.year);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.metANN);
            })
            .attr("height", function (d) {
                return height - y(d.metANN);
            });

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x")
            .call(d3.axisBottom(x));
        
        
        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        var ticks = d3.selectAll(".tick text");
        ticks.attr("class", function (d, i) {
            if (i % 5 != 0) d3.select(this).remove();
        });
    });

}

function load_chart2() {


    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    var parseTime = d3.timeParse("%Y");


    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.yr);
        })
        .y(function (d) {
            if (d.mean < 900) return y(d.mean); else return 0;
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#chart2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data.csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.yr = parseTime(d.YEAR);
            d.mean = +d.metANN;
        });

        // Scale the range of the data
        avg = d3.mean(data, function (d) {
            if (d.mean < 900) return d.mean; else return 0;
        });

        x.domain(d3.extent(data, function (d) {
            return d.yr;
        }));
        y.domain(d3.extent(data, function (d) {
            if (d.mean < 900) return d.mean; else return 0;
        }));

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x")
            .call(d3.axisBottom(x));

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .attr("class", "axistext")
            .text("Year");

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y")
            .call(d3.axisLeft(y));

        // text label for the y axis
        svg.append("text")
            .attr("class", "y")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axistext")
            .text("Mean Annual Temperature (in °C)");

    });
}