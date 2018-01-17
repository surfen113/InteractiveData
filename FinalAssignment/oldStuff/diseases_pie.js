 
var myData = null;
var totalDiseaseData = 0;

var crs_total = 0;
var diphtheria_total = 0;
var JapEnc_total = 0;
var measles_total = 0;
var mumps_total = 0;
var ntetanus_total = 0;
var pertussis_total = 0;
var polio_total = 0;
var rubella_total = 0;
var ttetanus_total = 0;
var yfever_total = 0;
var crs_label, diphtheria_label , JapEnc_label , measles_label , mumps_label , ntetanus_label , pertussis_label , polio_label , rubella_label , ttetanus_label , yfever_label;


var labels = null;
var data = null;
var backgroundColor = null;

function getTotalDiseaseCases(file, label_disease, color){
    d3.csv(file)
        .row(function(d) { return d; })
        .get(function(error, rows) {
          // console.log(rows);
          myData = rows;// Now you can assign it
          DataIsReady(label_disease)// Now you can draw it
        });
}

function DataIsReady(label_disease, color) {
  // console.log(myData);// will trace the data that was loaded
  // Here you can draw your visualization
  // console.log(myData);

          for (var i = 0; i < myData.length; i++) {
            // console.log(myData.length);
            var row = myData[i];
            Object.keys(row).forEach(function (key) {
                addDisease(key, row);
            });
        }
    //         labels = label_disease;
    labels = [crs_label, diphtheria_label , JapEnc_label , measles_label , mumps_label , ntetanus_label , pertussis_label , polio_label , rubella_label , ttetanus_label , yfever_label];
    data = [20000, diphtheria_total , 20000 , measles_total , mumps_total , ntetanus_total , pertussis_total , polio_total , rubella_total , ttetanus_total , yfever_total];
  

    var data = {
      datasets: [{
        data: data,
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
           "#FF5733",
          "#E7FF33",
           "#8AFF33",
          "#33E8FF",
           "#3354FF",
          "#CB33FF", 
          "#FF33C7",
          "#FBD8D8",
        ]
      }],
      labels: labels
    };

    $(document).ready(
      function() {
        var canvas = document.getElementById("myChart");
        var ctx = canvas.getContext("2d");
        var myNewChart = new Chart(ctx, {
          type: 'pie',
          data: data
        });

        canvas.onclick = function(evt) {
          var activePoints = myNewChart.getElementsAtEvent(evt);
          if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];

            var label = chartData.labels[idx];
            var value = chartData.datasets[0].data[idx];

             $("#slide0-content").empty();
            $disease_description = '<div><span><p>' + label + '</p></span></div>'
            $('#slide0-content').append($disease_description);
            // $disease_description = getDescription(label)
            // $disease_description_html = '<div><span><p>' + $disease_description + '</p></span></div>'
            // $('#slide0-content').append($disease_description_html);

  
          }
        };
      }
    );


}

function addDisease(key, row){
    switch (row["Disease"]) {
        case "CRS":
            crs_label = "CRS"
            if(!isNaN(key)){
                
                crs_total += Number(row[key]);
            }
            break;
        case "diphtheria":
            diphtheria_label = "diphtheria"
            if(!isNaN(key)){
                
                diphtheria_total += Number(row[key]);
            }
            break;
        case "JapEnc":
            JapEnc_label = "Japanese encephalitis"
            if(!isNaN(key)){           
                JapEnc_total += Number(row[key]);
            }
            break;
        case "measles":
            measles_label = "measles"
            if(!isNaN(key)){
                
                measles_total += Number(row[key]);
            }
            break;
        case "Mumps":
            mumps_label = "Mumps"
            if(!isNaN(key)){
                
                mumps_total += Number(row[key]);
            }
            break;
        case "ntetanus":
            ntetanus_label = "ntetanus"
            if(!isNaN(key)){
                
                ntetanus_total += Number(row[key]);
            }
            break;
        case "pertussis":
            pertussis_label = "pertussis"
            if(!isNaN(key)){
                
                pertussis_total += Number(row[key]);
            }
            break;
        case "polio":
            polio_label = "polio"
            if(!isNaN(key)){
                
                polio_total += Number(row[key]);
            }
            break;
        case "Rubella":
            rubella_label = "Rubella"
            if(!isNaN(key)){
                
                rubella_total += Number(row[key]);
            }
            break;
        case "ttetanus":
            ttetanus_label = "ttetanus"
            if(!isNaN(key)){
                
               ttetanus_total += Number(row[key]);
            }
            break;
        case "yfever":
            yfever_label = "yfever"
            if(!isNaN(key)){
                
                yfever_total += Number(row[key]);
            }
            break;
    }
}



function getTotalCases(){
    getTotalDiseaseCases("data/test.csv");
 
}

// getDescription(label){
//     switch (row["Disease"]) {
//         case "CRS":
//             return "asdad sdadas asdasd";
//         case "diphtheria":
//             return "aaaaaaaaaaa";
//         case "JapEnc":
//             return "aaaaaaaaaaa";
//         case "measles":
//             return "aaaaaaaaaaa";
//         case "Mumps":
//             return "aaaaaaaaaaa";
//         case "ntetanus":
//            return "aaaaaaaaaaa";
//         case "pertussis":
//             return "aaaaaaaaaaa";
//         case "polio":
//             return "aaaaaaaaaaa";
//         case "Rubella":
//             return "aaaaaaaaaaa";
//         case "ttetanus":
//            return "aaaaaaaaaaa";
//         case "yfever":
//             return "aaaaaaaaaaa";
//     }
// }