$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['#fff', '#4BBFC3', '#fff', '#fff', 'whitesmoke'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', '5thpage'],
        menu: '#menu',
        scrollingSpeed: 1000,
        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            // if (index == 2) {
            //     document.getElementById('footer').style.display = 'inline';
            // }

            if (index == 1) {
                document.getElementById('footer').style.display = 'none';
                $("#menu").find("li").find("a").css("color", "white");
            }
            else
            {
                document.getElementById('footer').style.display = 'inline';
                $("#menu").find("li").find("a").css("color", "black");
            }

            // if (index == 3) {
            //     document.getElementById('footer').style.display = 'inline';
            // }
            //
            // if (index == 4) {
            //     document.getElementById('footer').style.display = 'inline';
            // }

            if (index == 5) {
                document.getElementById('footer').style.display = 'none';
            }
        }
    });

    //document.getElementById( 'footer' ).style.display = 'none';
    populateHTML("diphtheria");
    changeDisease("diphtheria");


    //updateLineData("India", "diphtheria");
});

//https://refreshless.com/nouislider/
$(document).ready(function () {
    var fancySlider = document.getElementById('slider');

    noUiSlider.create(fancySlider, {
        start: [fromYr, toYr],
        connect: true,
        behaviour: 'drag-tap',
        tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
        padding: 1,
        //step: 1,
        range: {
            'min': 1998,
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

$("input[name='selectPie']").change(function (radioChanged) {
    //populateHTML(radioChanged.currentTarget.value);
    populateHTML(radioChanged.currentTarget.value);
    changeDiseaseForPieChart(radioChanged.currentTarget.value, $("label[for='" + radioChanged.currentTarget.id + "']").text());
    chekstuff();
    changeDisease(radioChanged.currentTarget.value);

    var country = $('.selectpicker').find("option:selected").val();
    updateLineData(country, radioChanged.currentTarget.value, $("label[for='" + radioChanged.currentTarget.id + "']").text());
});

$("input[name='mode']").change(function (radioChanged) {
    changeMode(radioChanged.currentTarget.value)
});


$(document).on('click', '#diseaseDescription', function () {
    //drawDonutChart("CRS");
    $.fn.fullpage.moveTo('secondPage', 1);
});

$(document).on('click', '#donutBackButton', function () {
    $.fn.fullpage.moveTo('secondPage', 0);
});

$(document).on('click', '#buttonExploreOnMap', function () {
    $.fn.fullpage.moveTo('3rdPage', 0);
});

$(document).on('click', '#toMapButton', function () {
    $.fn.fullpage.moveTo('3rdPage', 0);
});

function drawDonutChart(selectedDisease) {
    //alert(selectedDisease);
    //changeDiseaseForPieChart(selectedDisease);
}

var playing = true;
//
// function Changeicon(playing){
//
//     if(playing){
//         document.getElementById("play").classList.remove('fa-pause');
//         document.getElementById("play").classList.add('fa-play');
//         playing = false;
//     }
//     else{
//         document.getElementById("play").classList.remove('fa-play');
//         document.getElementById("play").classList.add('fa-pause');
//         playing = true;
//     }
// // document.getElementById("MyElement").classList.remove('MyClass');
// }

var PauseClass = true;
function ChangeToPlay() {

    // if(PauseClass){
    document.getElementById("play").classList.remove('fa-pause');
    document.getElementById("play").classList.add('fa-play');
    // PauseClass = false;
    // }
    // else{
    //     document.getElementById("play").classList.remove('fa-play');
    //     document.getElementById("play").classList.add('fa-pause');
    //     PauseClass = true;
    // }
}