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

$(document).ready(function() {
    var mySlider = $("#ex2").bootstrapSlider();
// Call a method on the slider
    var value = mySlider.bootstrapSlider('getValue');
// For non-getter methods, you can chain together commands
});


$("#ex2").on("slide", function(slideEvt) {
    filterData(slideEvt.value[0], slideEvt.value[1])
});

$("input[name='rb']").change(function (radioChanged) {
    changeDisease(radioChanged.currentTarget.value)
});
// Without JQuery
//var slider = new Slider('#ex2', {});