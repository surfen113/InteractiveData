
$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'],
        menu: '#menu',
        scrollingSpeed: 1000
    });

});


//https://refreshless.com/nouislider/
$(document).ready(function() {
    var fancySlider = document.getElementById('slider');

    noUiSlider.create(fancySlider, {
        start: [ 1993, 2003 ],
        connect: true,
        behaviour: 'drag-tap',
        tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
        padding: 1,
        step: 1,
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



$(document).on('click', '#crsDescription', function(){
    drawPieChart("CRS");
    $.fn.fullpage.moveTo('secondPage', 1);
});

function drawPieChart(selectedDisease) {
    //alert(selectedDisease);
    //changeDiseaseForPieChart(selectedDisease);
}
