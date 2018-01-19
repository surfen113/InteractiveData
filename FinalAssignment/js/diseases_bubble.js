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

    // $(document).ready(function () {
    //    document.getElementById("rb2").click();
    //     document.getElementById('CRS').style.backgroundColor = "#eee";
    // });

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
       // document.getElementById('CRS').style.backgroundColor = "#fff";
    }
    $("#slide0-content").empty();
    var string = "<br><br> <button class='btn btn-primary' id='diseaseDescription'>Discover the disease distribution</button>";
    $disease_description = '<div id="textDiseaseDescription"><p>' + myFunction(disease_label) + '</p></div>' + string;
    $('#slide0-content').append($disease_description);
}

function myFunction(opt) {
    switch (opt) {
        case "CRS":
            return "<h1>Congenital rubella syndrome</h1></br></br>Congenital rubella syndrome (CRS) is an illness in infants that results from maternal infection with rubella virus during pregnancy. When rubella infection occurs during early pregnancy, serious consequences–such as miscarriages, stillbirths, and a constellation of severe birth defects in infants–can result. The risk of congenital infection and defects is highest during the first 12 weeks of gestation and decreases after the 12th week of gestation; defects are rare after infection in the 20th week (or later) of gestation. Common congenital defects of CRS include cataracts, congenital heart disease, hearing impairment, and developmental delay. Infants with CRS often present with more than 1 sign or symptom consistent with congenital rubella infection. However, infants may present with a single defect, with hearing impairment being the most common single defect.";
        case "diphtheria":
            return "<h1>Diphtheria</h1></br></br>Diphtheria is an infection caused by the bacterium Corynebacterium diphtheriae. Signs and symptoms may vary from mild to severe. They usually start two to five days after exposure. Symptoms often come on fairly gradually, beginning with a sore throat and fever. In severe cases, a grey or white patch develops in the throat. This can block the airway and create a barking cough as in croup. The neck may swell in part due to enlarged lymph nodes. A form of diphtheria that involves the skin, eyes, or genitals also exists. Complications may include myocarditis, inflammation of nerves, kidney problems, and bleeding problems due to low levels of platelets. Myocarditis may result in an abnormal heart rate and inflammation of the nerves may result in paralysis.";
        case "JapEnc":
            return "<h1>Japanese encephalitis</h1></br></br>Japanese encephalitis (JE) is a disease spread through mosquito bites. Symptoms usually take 5-15 days to develop and include fever, headache, vomiting, confusion, and difficulty moving. Symptoms that develop later include swelling around the brain and coma. JE is a serious disease that may cause death.";
        case "measles":
            return "<h1>Measles</h1></br></br>Measles is a highly contagious infection caused by the measles virus. Initial signs and symptoms typically include fever, often greater than 40 °C (104.0 °F), cough, runny nose, and inflamed eyes.[3][4] Two or three days after the start of symptoms, small white spots may form inside the mouth, known as Koplik's spots. A red, flat rash which usually starts on the face and then spreads to the rest of the body typically begins three to five days after the start of symptoms. Symptoms usually develop 10–12 days after exposure to an infected person and last 7–10 days. Complications occur in about 30% and may include diarrhea, blindness, inflammation of the brain, and pneumonia among others. </br>Measles is an airborne disease which spreads easily through the coughs and sneezes of those infected. It may also be spread through contact with saliva or nasal secretions. Nine out of ten people who are not immune and share living space with an infected person will catch it.";
        case "Mumps":
            return "<h1>Mumps</h1></br></br>Mumps is a viral disease caused by the mumps virus. Initial signs and symptoms often include fever, muscle pain, headache, and feeling tired. This is then usually followed by painful swelling of one or both parotid salivary glands. Symptoms typically occur 16 to 18 days after exposure and resolve after seven to ten days. Symptoms in adults are often more severe than in children. About a third of people have mild or no symptoms. Complications may include meningitis (15%), pancreatitis (4%), permanent deafness, and testicular inflammation which uncommonly results in infertility. Women may develop ovarian swelling but this does not increase the risk of infertility.</br>Mumps is highly contagious and spreads rapidly among people living in close quarters. The virus is transmitted by respiratory droplets or direct contact with an infected person. People are infectious to each other from about seven days before the start of symptoms to about eight days after.";
        case "ntetanus":
            return "<h1>Tetanus</h1></br></br>Tetanus, also known as lockjaw, is caused by an infection with the bacterium Clostridium tetani, which is commonly found in soil, saliva, dust, and manure. he bacteria generally enter through a break in the skin such as a cut or puncture wound by a contaminated object. They produce toxins that interfere with muscle contractions, resulting in the typical symptoms. In the most common type, the spasms begin in the jaw and then progress to the rest of the body. These spasms usually last a few minutes each time and occur frequently for three to four weeks. Other symptoms may include fever, sweating, headache, trouble swallowing, high blood pressure, and a fast heart rate. Onset of symptoms is typically three to twenty-one days following infection. It may take months to recover. About 10% of those infected die.";
        case "pertussis":
            return "<h1>Pertussis</h1></br></br>Pertussis (also known as whooping cough or 100-day cough) is caused by the bacterium Bordetella pertussis and is a highly contagious bacterial disease. Initially, symptoms are usually similar to those of the common cold with a runny nose, fever, and mild cough. This is then followed by weeks of severe coughing fits. Following a fit of coughing, a high-pitched whoop sound or gasp may occur as the person breathes in. The coughing may last for 10 or more weeks, hence the name. A person may cough so hard that they vomit, break ribs, or become very tired from the effort. The time between infection and the onset of symptoms is usually seven to ten days. Disease may occur in those who have been vaccinated, but symptoms are typically milder.</br> Pertussis is an airborne disease which spreads easily through the coughs and sneezes of an infected person. People are infectious to others from the start of symptoms until about three weeks into the coughing fits. Those treated with antibiotics are no longer infectious after five days.";
        case "polio":
            return "<h1>Poliomyelitis</h1></br></br>Poliomyelitis, often called polio or infantile paralysis, is an infectious disease caused by the poliovirus. In about 0.5% of cases there is muscle weakness resulting in an inability to move. This can occur over a few hours to a few days. The weakness most often involves the legs but may less commonly involve the muscles of the head, neck and diaphragm. Many but not all people fully recover. Years after recovery post-polio syndrome may occur, with a slow development of muscle weakness similar to that which the person had during the initial infection. Those who are infected may spread the disease for up to six weeks even if no symptoms are present.";
        case "Rubella":
            return "<h1>Rubella</h1></br></br>Rubella, also known as German measles or three-day measles, is an infection caused by the rubella virus. For children who do have symptoms, a red rash is typically the first sign. The rash generally first appears on the face and then spreads to the rest of the body, and lasts about three days. Other symptoms that may occur 1 to 5 days before the rash appears include a low-grade fever, headache, mild pink eye (redness or swelling of the white of the eye), general discomfort, swollen and enlarged lymph nodes, cough. Most adults who get rubella usually have a mild illness, with low-grade fever, sore throat, and a rash that starts on the face and spreads to the rest of the body. Some adults may also have a headache, pink eye, and general discomfort before the rash appears. About 25 to 50% of people infected with rubella will not experience any symptoms.";
        case "ttetanus":
            return "<h1>Tetanus</h1></br></br>Tetanus, also known as lockjaw, is caused by an infection with the bacterium Clostridium tetani, which is commonly found in soil, saliva, dust, and manure. he bacteria generally enter through a break in the skin such as a cut or puncture wound by a contaminated object. They produce toxins that interfere with muscle contractions, resulting in the typical symptoms. In the most common type, the spasms begin in the jaw and then progress to the rest of the body. These spasms usually last a few minutes each time and occur frequently for three to four weeks. Other symptoms may include fever, sweating, headache, trouble swallowing, high blood pressure, and a fast heart rate. Onset of symptoms is typically three to twenty-one days following infection. It may take months to recover. About 10% of those infected die.";
        case "yfever":
            return "<h1>Yellow fever</h1></br></br>Yellow fever is a viral disease of typically short duration. The disease is caused by the yellow fever virus and is spread by the bite of an infected mosquito. In most cases, symptoms include fever, chills, loss of appetite, nausea, muscle pains particularly in the back, and headaches. Symptoms typically improve within five days. In about 15% of people within a day of improving, the fever comes back, abdominal pain occurs, and liver damage begins causing yellow skin. If this occurs, the risk of bleeding and kidney problems is also increased.";
    }
}
