/**
 * Created by jri on 17.01.18.
 */
$("input[name='selectPie']").change(function (radioChanged) {
    changeDiseaseForPieChart(radioChanged.currentTarget.value)
});

function changeDiseaseForPieChart(diseaseName) {
    disease = diseaseName;
    readThisData(disease, 1980);
}
var animate = true;


$("#donutChart").donutpie({
    radius: 500,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

$(".exp2").donutpie({
    radius: 500,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

var donutMapData = [];
var data = [];

var disease = "diphtheria";

var year = 1980;

d3.csv('data/top_Global.csv', function (data) {
    donutMapData = data.filter(function (values) {
        return values["region"] != "world";
    });

    readThisData(disease, year, false);
});

function readThisData(disease, year, animate) {
    data = [];
    var tempData = donutMapData.filter(function (diseaseData) {
        return diseaseData["Disease"] == disease;
    });

    //console.log(disease);
    //console.log(tempData);
    var sum = 0;
    tempData.forEach(function (value) {
        console.log(sum);
        sum = sum + (+value[year]);
    });

    tempData.forEach(function (value) {
        data.push({
            name: value["region"],
            hvalue: getPercentage(+value[year], sum),
            cases: +value[year]
            //color: colorGaps[color]
        })
    });

    ready(animate, data, sum, year);

    //console.log(data);
    //$("#donutChart").donutpie('update', data);

}

function ready(animate, data, sum, year) {

    if (animate) {

        var year2 = year;
        var myVar = setInterval(function (d) {
            readThisData(disease, year2, true);
            if (year < 2017) {
                $(".exp2").donutpie('update', data, sum, year2);
                year2 += 1;
            }
            else
                year2 = year;
        }, 250);
    }
    else
    {
        $(".exp").donutpie('update', data, sum, year);
        ready(true, data, sum, year)
}
}


function getPercentage(data, sum) {
    if (sum > 0) {
        return data / sum * 100;
    }
    else {
        return 0;
    }
}

