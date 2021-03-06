/**
 * Created by jri on 17.01.18.
 */
// $("input[name='selectPie']").change(function (radioChanged) {
//     changeDiseaseForPieChart(radioChanged.currentTarget.value)
// });

var timeout;
var playState = true;
var currentYear = 1999;

function changeDiseaseForPieChart(diseaseName, diseaseFullName) {
    clearTimeout(timeout);
    $("#headerDonuts").html("Exploring <b>" + diseaseFullName + "</b> distribution in different regions");
    playState = false;
    disease = diseaseName;
    readThisData(disease, 2016, false);
}


$("#donutChart").donutpie({
    radius: 450,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

$(".exp2").donutpie2({
    radius: 450,
    tooltip: true,
    tooltipClass: "donut-pie-tooltip-bubble"
});

var donutMapData = [];
var data = [];

var disease = "diphtheria";

var year = 2016;

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

        // if (currentYear >= 2016) {
        //     currentYear = 1998;
        //
        // }
        // else if (currentYear <= 1999) {
        //     currentYear = 2016
        // }
    }
}

function chekstuff() {
    if (!playState)
        playState = true;
    document.getElementById("play").classList.remove('fa-play');
    document.getElementById("play").classList.add('fa-pause');
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
            document.getElementById("play").classList.remove('fa-pause');
            document.getElementById("play").classList.add('fa-play');
        }
        else {
            readThisData(disease, currentYear, true);
            playState = true;
            document.getElementById("play").classList.remove('fa-play');
            document.getElementById("play").classList.add('fa-pause');
        }
    });

    $(document).on('click', '#next', function () {
        clearTimeout(timeout);
        playState = false;
        if (currentYear >= 2016) {
            currentYear = 1998;
        }
        updateRightOneYear(disease, currentYear + 1, false);

    });

    $(document).on('click', '#prev', function () {
        clearTimeout(timeout);
        playState = false;
        if (currentYear <= 1999) {
            currentYear = 2017
        }
        updateRightOneYear(disease, currentYear - 1, false);

    });

