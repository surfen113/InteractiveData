$("#yearSlider").rangeSlider({
    bounds: {min: 2010, max: 2017},
    defaultValues: {min: 2011, max: 2016},
    step: 1
});

$("#yearSlider").bind("valuesChanging", function(e, data){
    console.log("Values just changed. min: " + data.values.min + " max: " + data.values.max);
    filterData(data.values.min, data.values.max, null);
});


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