/* MapStuff goes here */

var map = new Datamap({
    element: document.getElementById('container'),
    fills: {
        HIGH: '#afafaf',
        LOW: '#123456',
        MEDIUM: 'blue',
        UNKNOWN: 'rgb(0,0,0)',
        defaultFill: 'green'
    },
    data: {
        IRL: {
            fillKey: 'HIGH',
            numberOfThings: 2002
        },
        USA: {
            fillKey: 'MEDIUM',
            numberOfThings: 10381
        }
    }
});

//draw a legend for this map
map.legend();

map.updateChoropleth({
    USA: {fillKey: 'LOW'},
    CAN: '#0fa0fa'
});


function redrawMap(min, max, modus) {
    console.log("Min: " + min + "  Max: " + max + "  Modus: " + modus);
}


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