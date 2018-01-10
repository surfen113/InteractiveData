/* MapStuff goes here */


d3.csv("data/rubella.csv", function(data) {
    var dataset = {};

    var onlyValues = data.map(function (value) {
        return value[2000]; });

    var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(["#ffbcad","#ff1e0f"]);

    data.forEach(function (value) { var iso = value["ISO_code"];
        var number = value[2000];

        if(number)
            dataset[iso]= { numberOfThings: number, fillColor: paletteScale(number) };
    });

    // render map
    var map = new Datamap({
        element: document.getElementById('container'),
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: { defaultFill: '#d3d3d3' },
        data: dataset,
        geographyConfig: {
            borderColor: '#696969',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: function(geo) {
                return geo['fillColor'] || '#d3d3d3';
            },
            // only change border
            highlightBorderColor: '#696969',
            // show desired information in tooltip
            popupTemplate: function(geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) { return ; }
                // console.log(data.numberOfThings)
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Incidences: <strong>', data.numberOfThings, '</strong>',
                    '</div>'].join('');
            }
        }
    });

//draw a legend for this map
    map.legend();
});


/* Year Slider stuff goes here */
$("#yearSlider").rangeSlider({
    bounds: {min: 2010, max: 2017},
    defaultValues: {min: 2011, max: 2016},
    step: 1
});

$("#yearSlider").bind("valuesChanging", function(e, data){
    console.log("Values just changed. min: " + data.values.min + " max: " + data.values.max);
    redrawMap(data.values.min, data.values.max, null);
});

function redrawMap(min, max, modus) {
    console.log("Min: " + min + "  Max: " + max + "  Modus: " + modus);

}