const baseURL = `https://api.weatherapi.com/v1/current.json?key=`
const apikey = `1853ae2cd91045efb24204748232808`
//https://api.weatherapi.com/v1/forecast.json?key=1853ae2cd91045efb24204748232808&q=46112&days=4&aqi=no&alerts=no
/**
 * The function `getData` uses jQuery's `getJSON` method to retrieve data from a JSON file and logs the
 * data to the console, or logs an error message if the retrieval fails.
 */
function getData(){
    $.getJSON(`./data/data.json`, (data) =>{
        console.log('data', data.STUDENTS);
        let students = data.STUDENTS
        $.each(students, (idx, student) =>{
            console.log(`index ${idx} students ${student.firstName}`);
            $(".student").append(`<p>${student.firstName}</p>`);
            $.each(student.classes, (idx, course) =>{
                $(".student").append(`<p>${course.className} ${course.classNumber}</p>`)
            })
        })
    })
    .fail(function(e) {
        console.log( "you have failed at getting data", e);
      })
      
}

function initListeners() {
    $("#submit").on("click", (e) =>{
        e.preventDefault();
        let city = $("#city").val();
        let zip = $("#zip").val();

        if(city != ''){
            let cityURL = baseURL + apikey + "&q=" + city + "&days=4&aqi=no&alerts=no"
            $.getJSON(cityURL, (data) =>{
                console.log(data)
            }).fail(function(e) {
                console.log( "you have failed at getting data", e);
              })
        }

        if(zip != ''){
            let zipURL = baseURL + apikey + "&q=" + zip + "&days=4&aqi=no&alerts=no"
            console.log(zipURL)
        }

        
        
    })
}
 
$(document).ready(function () {
initListeners();
    // getData()
});