/**
 * Created by jri on 12.01.18.
 */

var map;
var mapData;

AmCharts.loadFile("data/rubella_2.csv", {}, function (response) {
    /**
     * Parse loaded CSV
     */

    mapData = AmCharts.parseCSV(response, {
        "separator": ",",
        "useColumnNames": true,
        "numberFields": ["value"]
    });

    readData(2000);

});

function loadMap(areas) {

    if(map)
    {
        map.dataProvider.areas = areas;
        map.validateData();
    }
    else {

        map = AmCharts.makeChart("chartdiv", {

            "type": "map",
            //"theme": "light",
            "projection": "miller",
            "colorSteps": 10,

            // "dataProvider": dataProvider,
            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": false,
                "areas": areas,
                "incidences": areas,

            },

            "areasSettings": {
                // "autoZoom": false,
                "balloonText": "<strong>[[title]]</strong><br />Incidences: [[incidences]]",
                "color": "#f8cd46",
                "colorSolid": "#8d1b10",
                "unlistedAreasAlpha": 1,
                "selectable": false
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
    }
}

function readData(from)
{
    var areas = [];
    for (var i = 0; i < mapData.length; i++) {
        var dataItem = mapData[i];
        var value = dataItem[from];
        var id = dataItem.ISO2;
        var option = -1;
        if (value > 0) {
            option = 0;
        }
        else if (value == 0) {
            option = 1;
        }
        else if (!value) {
            option = 2;
        }
        switch (option){
            case 0: areas.push({
                id: id,
                incidences: value,
                value: Math.log(value)
            });
            break;
            case 1: areas.push({
                id: id,
                incidences: 0,
                log: 0,
                color: "#008000"
            });
            break;
            case 2: areas.push({
                id: id,
                incidences: "No data",
                log: -1,
                color: "#dddddd",
            });
            break;
        }

    }
    loadMap(areas);
}


function filterData(from, to, mode) {
readData(from);



}
