/**
 * Created by jri on 17.01.18.
 */
// $("input[name='selectPie']").change(function (radioChanged) {
//     changeDiseaseForPieChart(radioChanged.currentTarget.value)
// });

var timeout;
var playState = true;
var currentYear = 1999;

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

        timeout = setTimeout(function () {
            currentYear = year;
            readThisData(disease, year, true);
        }, millisecondsToWait);


    }
    else {
        $(".exp").donutpie('update', data, sum, year);
        ready(true, data, sum, year)
    }
}


function updateRightOneYear(disease, year, animate) {
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
    ready2(animate, data, sum, year);

}

function ready2(animate, data, sum, year) {
    console.log(year);
    if (!animate) {
        $(".exp2").donutpie('update', data, sum, year);
        var millisecondsToWait = 1200;
        currentYear = year;
        if (currentYear >= 2016) {
            currentYear = 1999;
        }
        if (currentYear <= 1980) {
            currentYear = 2017
        }


    }
    else {
        //$(".exp").donutpie('update', data, sum, year);
        //ready(true, data, sum, year)
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


$(document).on('click', '#play', function () {
    if (playState == true) {
        clearTimeout(timeout);
        playState = false;
    }
    else {
        readThisData(disease, currentYear, true);
        playState = true;
    }
});

$(document).on('click', '#next', function () {
    clearTimeout(timeout);
    playState = false;
    updateRightOneYear(disease, currentYear + 1, false);

});

$(document).on('click', '#prev', function () {
    clearTimeout(timeout);
    playState = false;
    updateRightOneYear(disease, currentYear - 1, false);

});

