/**
 * Created by jri on 12.01.18.
 */

var map;
var mapData;
var fromYr = 2008;
var toYr = 2014;
var disease = "CRS";
var mode="total";

AmCharts.loadFile("data/data.csv", {}, function (response) {
    /**
     * Parse loaded CSV
     */

    mapData = AmCharts.parseCSV(response, {
        "separator": ",",
        "useColumnNames": true,
        "numberFields": ["value"]
    });

    readData();
});


AmCharts.loadFile("data/income2.csv", {}, function (response) {

    inhabitantData = AmCharts.parseCSV(response, {
        "separator": ",",
        "useColumnNames": true,
        "numberFields": ["value"]
    });

    //readInhabitantData();
});


function filterInhabitants(from, to, country) {
    var sum = 0;

    var thisData = inhabitantData.filter(function (data) {
        return data.ISO2 === country;
    });
    var areas = [];
    for (var i = 0; i < thisData.length; i++) {
        var dataItem = thisData[i];
        //if (dataItem.Disease === disease)
        {

            for (var year = from; year <= to; year++) {
                value = +dataItem[year];

                if (value != null && value > 0) {
                    sum = sum + value;
                }

            }


            //console.log("Country: "+country + " :" + sum);
        }
    }
    return sum;
}

function loadMap(areas) {

    if (map) {
        map.dataProvider.areas = areas;
        map.validateData();
    }
    else {

        map = AmCharts.makeChart("chartdiv", {

            "type": "map",
            //"theme": "light",
            "projection": "equirectangular",
            "colorSteps": 10,
            "preventDragOut": "false",
            "zoomDuration": 0.3,
            "zoomControl": {
                "zoomLevel": 4,

                "zoomControlEnabled": true,
                left: 100,
                homeButtonEnabled: false
            },

            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": false,
                "areas": areas,
                "selectable": false,

            },

            "areasSettings": {
                // "autoZoom": false,
                "balloonText": "<strong>[[title]]</strong><br />[[description]]",
                // "color": "#f8cd46",
                // "colorSolid": "#8d1b10",
                "unlistedAreasAlpha": 1,
                "selectedColor": undefined
            },
            "smallMap": {},
            "export": {
                "enabled": true,
                "position": "bottom-right"
            },

            "legend": {
                width: "100%",
                divId: "legenddiv",
                marginRight: 27,
                marginLeft: 27,
                equalWidths: false,
                backgroundAlpha: 0.5,
                backgroundColor: "#f5f5f5",
                borderColor: "#f5f5f5",
                borderAlpha: 1,
                top: 450,
                left: 0,
                horizontalGap: 10,
                data: [{
                    title: "No data",
                    color: "#dddddd"
                }, {

                    title: "Very Low",
                    color: "#008000"
                },
                    {
                        title: "Low",
                        color: "#d8a64f"
                    }, {
                        title: "Medium",
                        color: "#b36d37"
                    }, {
                        title: "High",
                        color: "#82261a"
                    }]

            }
        });

    }
}

var percentGaps = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
];

var percentGaps2 = [
    0,
    0.0001,
    0.0002,
    0.0004,
    0.0006,
    0.0008,
    0.001,
    0.002,
    0.004,
    0.006,
    0.008,
];

var colorGaps = [
    "#8eee8e",
    "#f3f300",
    "#FFE200",
    "#FFC600",
    "#FFAA00",
    "#FF8D00",
    "#FF7100",
    "#FF5500",
    "#FF3800",
    "#FF1C00",
    "#FF0000",
    "#dddddd"
];
var areas = [];

function putColor(id, sum, percentageText, color) {
    areas.push({
        id: id,
        description: "Incidences: " + sum + "<br>Percentage: " + percentageText,
        //value: sum,
        color: colorGaps[color]
    });
}

function getTotal(dataset, id) {

    var total = 0;

    var dataPresent = false;

    if (id != 0) {
        var countryData = dataset.filter(function (data) {
            return data.ISO2 === id;
        });
        dataset = countryData;
    }

    for (var year = fromYr; year <= toYr; year++) {
        total += d3.sum(dataset, function (number) {
            if(number[year])
                dataPresent = !dataPresent || true;
            else
                dataPresent = dataPresent || false;
            return number[year];
        });
    }

    //console.log(id + ": " + dataPresent);

    if(dataPresent)
        return total;
    else
    {
        return null;
    }

}

function readData() {

    areas = [];

    var diseaseData = mapData.filter(function (data) {
        return data.Disease === disease;
    });

    var total = getTotal(diseaseData, 0);

    for (var i = 0; i < diseaseData.length; i++) {
        var dataItem = diseaseData[i];
        var id = dataItem.ISO2;

        if(mode == "inhabitants") {
            var inhabitants = filterInhabitants(fromYr, toYr, id);

            var sum = getTotal(diseaseData, id);
            var percentage = (sum / inhabitants * 100);
            var percentageText = percentage.toFixed(4) + " %";

            switch (true) {
                case sum === null:
                    putColor(id, "No Data", "No Data", 11);
                    break;
                case percentage === percentGaps2[0]:
                    putColor(id, sum, percentageText, 0);
                    break;
                case percentage <= percentGaps2[1]:
                    putColor(id, sum, percentageText, 1);
                    break;
                case percentage <= percentGaps2[2]:
                    putColor(id, sum, percentageText, 2);
                    break;
                case percentage <= percentGaps2[3]:
                    putColor(id, sum, percentageText, 3);
                    break;
                case percentage <= percentGaps2[4]:
                    putColor(id, sum, percentageText, 4);
                    break;
                case percentage <= percentGaps2[5]:
                    putColor(id, sum, percentageText, 5);
                    break;
                case percentage <= percentGaps2[6]:
                    putColor(id, sum, percentageText, 6);
                    break;
                case percentage <= percentGaps2[7]:
                    putColor(id, sum, percentageText, 7);
                    break;
                case percentage <= percentGaps2[8]:
                    putColor(id, sum, percentageText, 8);
                    break;
                case percentage > percentGaps2[9]:
                    putColor(id, sum, percentageText, 9);
                    break;
                case percentage > percentGaps2[10]:
                    putColor(id, sum, percentageText, 10);
                    break;
            }

        }
        else {
            var sum = getTotal(diseaseData, id);
            var percentage = (sum / total * 100);
            var percentageText = percentage.toFixed(4) + " %";

            switch (true) {
                case sum === null:
                    putColor(id, "No Data", "No Data", 11);
                    break;
                case percentage === percentGaps[0]:
                    putColor(id, sum, percentageText, 0);
                    break;
                case percentage <= percentGaps[1]:
                    putColor(id, sum, percentageText, 1);
                    break;
                case percentage <= percentGaps[2]:
                    putColor(id, sum, percentageText, 2);
                    break;
                case percentage <= percentGaps[3]:
                    putColor(id, sum, percentageText, 3);
                    break;
                case percentage <= percentGaps[4]:
                    putColor(id, sum, percentageText, 4);
                    break;
                case percentage <= percentGaps[5]:
                    putColor(id, sum, percentageText, 5);
                    break;
                case percentage <= percentGaps[6]:
                    putColor(id, sum, percentageText, 6);
                    break;
                case percentage <= percentGaps[7]:
                    putColor(id, sum, percentageText, 7);
                    break;
                case percentage <= percentGaps[8]:
                    putColor(id, sum, percentageText, 8);
                    break;
                case percentage > percentGaps[9]:
                    putColor(id, sum, percentageText, 9);
                    break;
                case percentage > percentGaps[10]:
                    putColor(id, sum, percentageText, 10);
                    break;
        }


        }
    }
    loadMap(areas);
}

function filterData(from, to) {
    fromYr = from;
    toYr = to;
    readData();
}

function changeDisease(diseaseName) {
    disease = diseaseName;
    readData();
}

function changeMode(modeName) {
    mode = modeName;
    readData();
}