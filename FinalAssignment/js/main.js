// $("#yearSlider").rangeSlider({
//     bounds: {min: 2010, max: 2017},
//     defaultValues: {min: 2011, max: 2016},
//     step: 1
// });
//
// $("#yearSlider").bind("valuesChanging", function(e, data){
//     //console.log("Values just changed. min: " + data.values.min + " max: " + data.values.max);
//     filterData(data.values.min, data.values.max, null);
// });


$(document).ready(function(){
    $("#demosMenu").change(function(){
        window.location.href = $(this).find("option:selected").attr("id") + '.html';
    });
});

$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        scrollingSpeed: 1000
    });

});


//https://refreshless.com/nouislider/

$(document).ready(function() {


    var fancySlider = document.getElementById('slider');

    noUiSlider.create(fancySlider, {
        start: [ 1996, 2000 ],
        connect: true,
        behaviour: 'drag-tap',
        tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
        padding: 1,
        //step: 1,
        range: {
            'min': 1979,
            'max': 2017
        }
    });

    fancySlider.noUiSlider.on('update', function(){
        document.getElementsByClassName("noUi-tooltip").innerHTML = "blub";
        var minmax = fancySlider.noUiSlider.get();
        filterData(parseInt(minmax[0]), parseInt(minmax[1]));
    });
});


// $("#ex2").on("slide", function(slideEvt) {
//     filterData(slideEvt.value[0], slideEvt.value[1])
// });

$("input[name='rb']").change(function (radioChanged) {
    changeDisease(radioChanged.currentTarget.value)
});

$("input[name='mode']").change(function (radioChanged) {
    changeMode(radioChanged.currentTarget.value)
});
// Without JQuery
//var slider = new Slider('#ex2', {});