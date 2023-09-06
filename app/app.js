const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=`
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
            let cityURL = baseURL + apikey + "&q=" + city + "&days=5&aqi=no&alerts=no"
            $.getJSON(cityURL, (data) =>{
                console.log(data)
                let current = data.current
                let forecast = data.forecast.forecastday
                $(".current").append(`<h1>${current.temp_f}F or ${current.temp_c}C</h1>`);
                $.each(forecast, (idx, forecastday) =>{
                    console.log(`index ${idx} forcast ${forecastday.day.avgtemp_f}`)
                    $(".forecast").append(`<p>${forecastday.day.avgtemp_f}</p>`)
                })
            }).fail(function(e) {
                console.log( "you have failed at getting data", e);
              })
        }

        if(zip != ''){
            let zipURL = baseURL + apikey + "&q=" + zip + "&days=5&aqi=no&alerts=no"
            $.getJSON(zipURL, (data) =>{
                console.log(data)
            }).fail(function(e) {
                console.log( "you have failed at getting data", e);
              })
        }

        
        
    })
}
 
$(document).ready(function () {
initListeners();
    // getData()
});