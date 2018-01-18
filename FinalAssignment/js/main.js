$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'],
        menu: '#menu',
        scrollingSpeed: 1000,
        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if (index == 2) {
                document.getElementById('footer').style.display = 'inline';
            }

            if (index == 1) {
                document.getElementById('footer').style.display = 'none';
            }

            if (index == 3) {
                document.getElementById('footer').style.display = 'inline';
            }

            if (index == 4) {
                document.getElementById('footer').style.display = 'inline';
            }
        }
    });

    //document.getElementById( 'footer' ).style.display = 'none';

});


//https://refreshless.com/nouislider/
$(document).ready(function () {
    var fancySlider = document.getElementById('slider');

    noUiSlider.create(fancySlider, {
        start: [1993, 2003],
        connect: true,
        behaviour: 'drag-tap',
        tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
        padding: 1,
        //step: 1,
        range: {
            'min': 1979,
            'max': 2017
        }
    });

    fancySlider.noUiSlider.on('update', function () {
        document.getElementsByClassName("noUi-tooltip").innerHTML = "";
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


$(document).on('click', '#crsDescription', function () {
    drawDonutChart("CRS");
    $.fn.fullpage.moveTo('secondPage', 1);
});

$(document).on('click', '#donutBackButton', function () {
    $.fn.fullpage.moveTo('secondPage', 0);
});

function drawDonutChart(selectedDisease) {
    //alert(selectedDisease);
    //changeDiseaseForPieChart(selectedDisease);
}
