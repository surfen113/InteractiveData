/**
 * Created by jri on 17.01.18.
 */
// $("input[name='selectPie']").change(function (radioChanged) {
//     changeDiseaseForPieChart(radioChanged.currentTarget.value)
// });

var timeout;
function changeDiseaseForPieChart(diseaseName) {
    clearTimeout(timeout);
    disease = diseaseName;
    readThisData(disease, 1999, false);
}


$("#donutChart").donutpie({
    radius: 350,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

$(".exp2").donutpie({
    radius: 350,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

var donutMapData = [];
var data = [];

var disease = "diphtheria";

var year = 1999;

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


    var sum = 0;
    tempData.forEach(function (value) {
        sum = sum + (+value[year]);
    });

    tempData.forEach(function (value) {
        data.push({
            name: value["region"],
            hvalue: getPercentage(+value[year], sum),
            cases: +value[year]
        })
    });

    ready(animate, data, sum, year);

    //$("#donutChart").donutpie('update', data);

}

function ready(animate, data, sum, year) {
console.log(year);
    if (animate) {
        $(".exp2").donutpie('update', data, sum, year);
        year += 1;
        var millisecondsToWait = 1200;

        if (year > 2016) {
            year = 1999;
        }

        timeout =setTimeout(function () {
            readThisData(disease, year, true);
        }, millisecondsToWait);


    }
    else {
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

