var margin = {top: 50, right: 50, bottom: 50, left: 100},
    width = (window.innerWidth*0.5) - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var transition = 150;

var x = d3.scale.linear().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10).tickFormat(d3.format("d"));

var yAxisLeft = d3.svg.axis().scale(y0)     //  <==  Add in 'Left' and 'y0'
    .orient("left").ticks(10);

var yAxisRight = d3.svg.axis().scale(y1)  // This is the new declaration for the 'Right', 'y1'
    .orient("right").ticks(10);           // and includes orientation of the axis to the right.

var valueline = d3.svg.line()
    .defined(function (d) {
        return d;
    })
    .x(function (d) {
        return x(d.year);
    })
    .y(function (d) {
        return y0(d.cases);
    })
    .interpolate("monotone");    // <== y0

var tooltip = d3.select(".lineChart")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .style("opacity", "0.8")
    .style("text-align", "left")
    .style("padding", "10px");

var valueline2 = d3.svg.line()
    .defined(function (d) {
        return d;
    })
    .x(function (d) {
        return x(d.year);
    })
    .y(function (d) {
        return y1(d.gdp);
    })
    .interpolate("monotone"); // <== y1

// console.log(d3.select('#section2').style('width'));
console.log(window.innerWidth);
var svg = d3.select(".lineChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    //.attr("width", '75%')
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var diseaseData = [];

var gdpData = [];

var data3 = [];

var currentDiseaseName = "Diphtheria";

var popData = [];

var countryid;

d3.csv("data/inhabitants.csv", function (error, data) {
    popData = data;

});

// Get the data
d3.csv("data/data.csv", function (error, data) {

    diseaseData = data;

    var actualdiseaseData = data.filter(function (value) {
        return value["Cname"] === "India" && value["Disease"] == "diphtheria";
    });

    var id = actualdiseaseData[0]["ISO2"];

    d3.csv("data/gdp_2.csv", function (error, data2) {

        gdpData = data2;

        var actualgdpData = data2.filter(function (value) {
            return value["Cname_data"] === "India";
        });

        for (var year_ = 1999; year_ <= 2016; year_++) {

            var popArray = popData.filter(function (value) {
                return value["ISO2"] === id && value[year_];
            });

            var percentage = +actualdiseaseData[0][year_]/+popArray[0][year_];

            console.log(percentage);

            data3.push({
                year: +year_,
                cases: percentage * Math.pow(10, 5),//+actualdiseaseData[0][year_],
                gdp: +actualgdpData[0][year_]
            });
        }

        // Scale the range of the data
        x.domain(d3.extent(data3, function (d) {
            return d.year;
        }));
        y0.domain([0, d3.max(data3, function (d) {
            return Math.max(d.cases);
        })]);
        y1.domain([0, d3.max(data3, function (d) {
            return Math.max(d.gdp);
        })]);

        svg.append("path")
            .attr("class", "line1")// Add the valueline path1.
            .style("stroke", "red")
            .attr("d", valueline(data3));

        svg.append("path")
            .attr("class", "line2")// Add the valueline path1.  // Add the valueline2 path1.
            .style("stroke", "darkblue")
            .attr("d", valueline2(data3));

        svg.append("g")            // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")      // text label for the x axis
            .attr("x", width /2-30 )
            .attr("y", margin.bottom - 10)
            .style("text-anchor", "middle")
            .text("Year");

        svg.append("g")
            .attr("class", "y axis")
            .style("fill", "red")
            .call(yAxisLeft)
            .append("text")
            .attr("fill", "#000")
            .attr("x", 50)
            .attr("y", -20)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Percentage Population Affected (x10\u00B3)");

        svg.append("g")
            .attr("class", "y axis2")
            .attr("transform", "translate(" + width + " ,0)")
            .style("fill", "darkblue")
            .call(yAxisRight)
            .append("text")
            .attr("fill", "#000")
            .attr("x", 45)
            .attr("y", -20)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("GDP (US $) per Capita");

        svg.selectAll(".dot")
            .data(data3.filter(function (d) {
                return d;
            }))
            .enter().append("circle")
            .attr("class", "dot")
            .style("fill", "red")
            .attr("cx", valueline.x())
            .attr("cy", valueline.y())
            .attr("r", 3.5);

        svg.selectAll(".dot2")
            .data(data3.filter(function (d) {
                return d;
            }))
            .enter().append("circle")
            .attr("class", "dot2")
            .style("fill", "darkblue")
            .attr("cx", valueline2.x())
            .attr("cy", valueline2.y())
            .attr("r", 3.5);

        svg.append("rect")
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)

        .on("mouseover", function(){
            focus.style("display", null);
            tooltip.style("visibility", "visible");})

        .on("mouseout", function(){
                    focus.style("display", "none");
            tooltip.style("visibility", "hidden");})

            // .on("mousemove", function(){
            //     return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px")
            //         ;})


        //
        // .on("mouseover", function () {
        //         focus.style("display", null);
        //     })
        //     .on("mouseout", function () {
        //         focus.style("display", "none");
        //     })
            .on("mousemove", mousemove);


        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        // focus.append("line")
        //     .attr("class", "y-hover-line hover-line")
        //     .attr("x1", width)
        //     .attr("x2", width)
        //     .style("fill", "yellow");
        //
        // focus.append("text")
        //     .attr("x", 15)
        //     .attr("y", 15)
        //     .attr("data-html", "true");

        var bisectDate = d3.bisector(function (d) {
            return d.year;
        }).left;

        function mousemove() {

            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data3, x0, 1),
                d0 = data3[i - 1],
                d1 = data3[i],
                d = x0 - d0.year > d1.year - x0 ? d1 : d0;

            var yvalue = y1(d.gdp) > y0(d.cases) ? y0(d.cases) : y1(d.gdp);

            focus.attr("transform", "translate(" + x(d.year) + "," + yvalue + ")");
            //
            // focus.select("text").attr("y", (height - yvalue) / 2);

            //line break still doesn't work

            var string = "<b>Percentage (x 10\u00B3): " + parseFloat(d.cases).toFixed(4) + " %<br>" + "GDP (US $): " + Math.round(d.gdp) + "</b>";

            tooltip.html(string);

            tooltip.style("bottom", ((height - yvalue))+"px").style("left",(d3.event.pageX+10)+"px");

            // focus.select("text").html(function () {
            //     return string
            // });
            //
            focus.select(".x-hover-line").attr("y2", height - yvalue);
            // //console.log(y0(d.cases));
            // console.log(y1(d.gdp));
            // console.log(height);
            //focus.select(".y-hover-line").attr("x2", width + width);
        }

    });
});

var disease = $("input[name='selectPie']").value;

function updateLineData(country, disease, diseaseFullName) {

    if(diseaseFullName == null) {
        console.log(currentDiseaseName);
        $("#headerLineChart").html(currentDiseaseName + " in " + country);
    }
    else {
        currentDiseaseName = diseaseFullName;
        $("#headerLineChart").html(currentDiseaseName + " in " + country);
    }



    data3 = [];

    console.log(country);

    console.log(disease);

    var actualdiseaseData = diseaseData.filter(function (value) {
        return value["Cname"] === country && value["Disease"] == disease;
    });

    var actualgdpData = gdpData.filter(function (value) {
        return value["Cname_data"] === country;
    });

    var id = actualdiseaseData[0]["ISO2"];

    // d3.csv("data/data.csv", function (error, data) {
    //
    //     diseaseData = data.filter(function (value) {
    //         return value["Cname"] === country && value["Disease"] == disease;
    //     });
    //
    //     d3.csv("data/gdp_2.csv", function (error, data2) {
    //
    //         gdpData = data2.filter(function (value) {
    //             return value["Cname_data"] === country;
    //         });

            for (var year_ = 1999; year_ <= 2016; year_++) {

                var popArray = popData.filter(function (value) {
                    return value["ISO2"] === id && value[year_];
                });

                var percentage = +actualdiseaseData[0][year_]/+popArray[0][year_];
                data3.push({
                    year: +year_,
                    cases: percentage*Math.pow(10, 5),//+actualdiseaseData[0][year_],
                    gdp: +actualgdpData[0][year_]
                });
            }

            // console.log(diseaseData);
            // console.log(gdpData);
            // console.log(data3);

            // Scale the range of the data
            x.domain(d3.extent(data3, function (d) {
                return d.year;
            }));
            y0.domain([0, d3.max(data3, function (d) {
                return Math.max(d.cases);
            })]);
            y1.domain([0, d3.max(data3, function (d) {
                return Math.max(d.gdp);
            })]);

            svg = d3.select(".lineChart");

            svg.select(".line1")
                .transition()// change the line
                .duration(transition)
                .attr("d", valueline(data3));

            svg.select(".line2")
                .transition()// change the line  // change the line
                .duration(transition)
                .attr("d", valueline2(data3));

            svg.select(".y.axis")
                .transition()// change the line
                .duration(transition)
                .call(yAxisLeft);

            svg.select(".y.axis2")
                .transition()// change the line
                .duration(transition)
                .call(yAxisRight);

            svg.selectAll(".dot")
                .data(data3.filter(function (d) {
                    return d;
                }))
                .transition()// change the line
                .duration(transition)
                .attr("cx", valueline.x())
                .attr("cy", valueline.y());

            svg.selectAll(".dot2")
                .data(data3.filter(function (d) {
                    return d;
                }))
                .transition()// change the line
                .duration(transition)
                .attr("cx", valueline2.x())
                .attr("cy", valueline2.y());

    //     });
    // });
}
$(function () {
    $('.selectpicker').on('change', function () {
        var selected = $(this).find("option:selected").val();
        updateLineData(selected, disease, null);
    });

});

function changeCountry(country, disease) {
    $(".selectpicker").val(country).change();
    $("#rb5").prop("checked", true);
    updateLineData(country, disease, "Mumps");
}