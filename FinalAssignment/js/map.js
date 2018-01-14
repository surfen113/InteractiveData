/**
 * Created by jri on 12.01.18.
 */

var map;
var mapData;
var fromYr = 2015;
var toYr = 2016;
var disease = "CRS";

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

            // "dataProvider": dataProvider,
            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": false,
                "areas": areas,
                "selectable": false,

            },

            "areasSettings": {
                // "autoZoom": false,
                "balloonText": "<strong>[[title]]</strong><br />Incidences: [[description]]",
                "color": "#f8cd46",
                "colorSolid": "#8d1b10",
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

function readData() {
    var diseaseData = mapData.filter(function (data) {
        return data.Disease === disease;
    });
    var areas = [];
    for (var i = 0; i < diseaseData.length; i++) {
        var dataItem = diseaseData[i];
        //if (dataItem.Disease === disease)
        {

            var sum = 0;
            for (var year = fromYr; year <= toYr; year++) {
                value = +dataItem[year];

                if (value != null && value > 0) {
                    sum = sum + value;
                }

            }

            //var value = dataItem[fromYr];
            var id = dataItem.ISO2;
            var option = -1;
            if (sum >= 10) {
                option = 0;
            }
            else {
                option = 1;
            }
            if (!sum) {
                option = 2;
            }
            switch (option) {
                case 0:
                    areas.push({
                        id: id,
                        description: sum.toString(),
                        value: Math.log(sum)
                    });
                    break;
                case 1:
                    areas.push({
                        id: id,
                        description: sum.toString(),
                        value: 0,
                        color: "#008000"
                    });
                    break;
                case 2:
                    areas.push({
                        id: id,
                        description: "No data",
                        value: -1,
                        color: "#dddddd"
                    });
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
