/**
 * Created by jri on 12.01.18.
 */

var map;
var dataSets;
var mapData;




AmCharts.addInitHandler(function (chart) {

    var dataProvider = chart.dataProvider;
    var areas = chart.dataProvider.areas;
    var colorRanges = dataProvider.colorRanges;

    // Based on https://www.sitepoint.com/javascript-generate-lighter-darker-color/
    function ColorLuminance(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }

        return rgb;
    }

    if (colorRanges) {

        var item;
        var range;
        var average;
        var variation;
        for (var i = 0, iLen = areas.length; i < iLen; i++) {

            item = areas[i];

            for (var x = 0, xLen = colorRanges.length; x < xLen; x++) {

                range = colorRanges[x];

                if (item.value >= range.start && item.value <= range.end) {
                    average = (range.start - range.end) / 2;

                    if (item.value <= average)
                        variation = (range.variation * -1) / item.value * average;
                    else if (item.value > average)
                        variation = range.variation / item.value * average;

                    item.color = ColorLuminance(range.color, variation.toFixed(2));
                }
            }
        }
    }

}, ["map"]);

AmCharts.loadFile("data/rubella_2.csv", {}, function (response) {
    /**
     * Parse loaded CSV
     */



    mapData = AmCharts.parseCSV(response, {
        "separator": ",",
        "useColumnNames": true,
        "numberFields": ["value"]
    });

    var max = 10000;
    var min = 0;


    var areas = [];
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem[2016];
        var id = dataItem.ISO2;
        var log = 0;
        if (value > 0) {
            log = Math.log(value);
        }
        else {
            log = 20.5;
        }

        areas.push({
            id: id,
            value: log,
            //color: "#000000"
        })
    }


    map = AmCharts.makeChart("chartdiv", {

        "type": "map",
        //"theme": "light",
        "projection": "miller",
        "colorSteps": 10,

        // "dataProvider": dataProvider,
        "dataProvider": {
            "map": "worldLow",
            "getAreasFromMap": true,
            "areas": areas,

            "colorRanges": [


                {
                    "start": 0.00000001,
                    "end": 0.99,
                    "color": "#f8cd46",
                    "variation": 0.4
                },
                {
                    "start": 1,
                    "end": 1.99,
                    "color": "#dfa138",
                    "variation": 0.4
                },
                {
                    "start": 2,
                    "end": 2.99,
                    "color": "#c7752a",
                    "variation": 0.4
                }, {
                    "start": 3,
                    "end": 4.99,
                    "color": "#af4b1e",
                    "variation": 0.4
                }, {
                    "start": 5,
                    "end": 8.99,
                    "color": "#982714",
                    "variation": 0.4
                }, {
                    "start": 9,
                    "end": 20,
                    "color": "#8d1b10",
                    "variation": 0.4
                },
                {
                    "start": 20,
                    "end": 21,
                    "color": "#e6e6e6",
                    "variation": 0.4
                }],

        },

        "areasSettings": {
            // "autoZoom": false,
            // "unlistedAreasColor": "#000000",
            // "unlistedAreasAlpha": 0.1,
            // "selectedColor": "#CC0000"
        },
        "smallMap": {},
        "export": {
            "enabled": true,
            "position": "bottom-right"
        },

        "valueLegend": {
            right: 10,
            minValue: "little",
            maxValue: "a lot!"
        }
    });

});

function setDataset(index) {
    map.dataProvider.areas = dataSets[Number(index)];
    map.validateData();
}


function filterData(from, to, mode) {
    var areas = [];
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem[from];
        var id = dataItem.ISO2;
        var log = 0;
        if (value > 0) {
            log = Math.log(value);
        }
        else {
            log = 20.5;
        }

        areas.push({
            id: id,
            value: log,
            //color: "#000000"
        })
    }

    map.dataProvider.areas = areas;
    map.validateData();


}
