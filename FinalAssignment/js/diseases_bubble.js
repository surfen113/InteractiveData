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
var crs_label, diphtheria_label, JapEnc_label, measles_label, mumps_label, ntetanus_label, pertussis_label, polio_label,
    rubella_label, ttetanus_label, yfever_label;


var labels = null;
var data = null;
var backgroundColor = null;

function getTotalDiseaseCases(file, label_disease, color) {
    d3.csv(file)
        .row(function (d) {
            return d;
        })
        .get(function (error, rows) {
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
    labels = [crs_label, diphtheria_label, JapEnc_label, measles_label, mumps_label, ntetanus_label, pertussis_label, polio_label, rubella_label, ttetanus_label, yfever_label];
    data = [20000, diphtheria_total, 20000, measles_total, mumps_total, ntetanus_total, pertussis_total, polio_total, rubella_total, ttetanus_total, yfever_total];


    var items = [
        {text: crs_label, count: 20000, test: "lalalalaa more Text...."},
        {text: diphtheria_label, count: diphtheria_total},
        {text: JapEnc_label, count: 20000},
        {text: measles_label, count: measles_total},
        {text: mumps_label, count: mumps_total},
        {text: ntetanus_label, count: ntetanus_total},
        {text: pertussis_label, count: pertussis_total},
        {text: polio_label, count: polio_total},
        {text: rubella_label, count: rubella_total},
        {text: ttetanus_label, count: ttetanus_total},
        {text: yfever_label, count: yfever_total},
    ];

    $(document).ready(function () {
        document.getElementById("CRS").click();
        document.getElementById('CRS').style.backgroundColor = "#eee";
    });

};

function addDisease(key, row) {
    switch (row["Disease"]) {
        case "CRS":
            crs_label = "CRS"
            if (!isNaN(key)) {

                crs_total += Number(row[key]);
            }
            break;
        case "diphtheria":
            diphtheria_label = "diphtheria"
            if (!isNaN(key)) {

                diphtheria_total += Number(row[key]);
            }
            break;
        case "JapEnc":
            JapEnc_label = "Japanese encephalitis"
            if (!isNaN(key)) {
                JapEnc_total += Number(row[key]);
            }
            break;
        case "measles":
            measles_label = "measles"
            if (!isNaN(key)) {

                measles_total += Number(row[key]);
            }
            break;
        case "Mumps":
            mumps_label = "Mumps"
            if (!isNaN(key)) {

                mumps_total += Number(row[key]);
            }
            break;
        case "ntetanus":
            ntetanus_label = "ntetanus"
            if (!isNaN(key)) {

                ntetanus_total += Number(row[key]);
            }
            break;
        case "pertussis":
            pertussis_label = "pertussis"
            if (!isNaN(key)) {

                pertussis_total += Number(row[key]);
            }
            break;
        case "polio":
            polio_label = "polio"
            if (!isNaN(key)) {

                polio_total += Number(row[key]);
            }
            break;
        case "Rubella":
            rubella_label = "Rubella"
            if (!isNaN(key)) {

                rubella_total += Number(row[key]);
            }
            break;
        case "ttetanus":
            ttetanus_label = "ttetanus"
            if (!isNaN(key)) {

                ttetanus_total += Number(row[key]);
            }
            break;
        case "yfever":
            yfever_label = "yfever"
            if (!isNaN(key)) {

                yfever_total += Number(row[key]);
            }
            break;
    }
}


function getTotalCases() {
    getTotalDiseaseCases("data/test.csv");

}

var default_value = true;

function populateHTML(disease_label) {
    if (default_value) {
        document.getElementById('CRS').style.backgroundColor = "#fff";
    }
    $("#slide0-content").empty();
    $disease_description = '<p>' + myFunction(disease_label) + '</p>'
    $('#slide0-content').append($disease_description);
}

function myFunction(opt) {
    switch (opt) {
        case "CRS":
            return "<h1>Congenital rubella syndrome</h1></br></br>Congenital rubella syndrome (CRS) is an illness in infants that results from maternal infection with rubella virus during pregnancy. When rubella infection occurs during early pregnancy, serious consequences–such as miscarriages, stillbirths, and a constellation of severe birth defects in infants–can result. The risk of congenital infection and defects is highest during the first 12 weeks of gestation and decreases after the 12th week of gestation; defects are rare after infection in the 20th week (or later) of gestation. Common congenital defects of CRS include cataracts, congenital heart disease, hearing impairment, and developmental delay. Infants with CRS often present with more than 1 sign or symptom consistent with congenital rubella infection. However, infants may present with a single defect, with hearing impairment being the most common single defect.<br><br> <button id='crsDescription'>Go to next Slide</button>";
        case "diphtheria":
            return "<h1>Diphtheria</h1></br></br>Diphtheria is an infection caused by the bacterium Corynebacterium diphtheriae. Signs and symptoms may vary from mild to severe. They usually start two to five days after exposure. Symptoms often come on fairly gradually, beginning with a sore throat and fever. In severe cases, a grey or white patch develops in the throat. This can block the airway and create a barking cough as in croup. The neck may swell in part due to enlarged lymph nodes. A form of diphtheria that involves the skin, eyes, or genitals also exists. Complications may include myocarditis, inflammation of nerves, kidney problems, and bleeding problems due to low levels of platelets. Myocarditis may result in an abnormal heart rate and inflammation of the nerves may result in paralysis.";
        case "JapEnc":
            return "JapEnc";
        case "measles":
            return "measles";
        case "Mumps":
            return "Mumps";
        case "ntetanus":
            return "ntetanus";
        case "pertussis":
            return "pertussis";
        case "polio":
            return "polio";
        case "Rubella":
            return "Rubella";
        case "ttetanus":
            return "ttetanus";
        case "yfever":
            return "yfever";
    }
}
