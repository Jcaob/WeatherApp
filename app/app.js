const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=`
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
                $(".current").html("")
                $(".forecast").html("")
                console.log(data)
                let current = data.current
                let forecast = data.forecast.forecastday
                let location = data.location
                console.log(current.condition.icon)
                $(".current").append(`
                <div class="current-card">
                    <h1>${location.name}</h1>
                    <p>${location.country}</p>
                    <img src="${current.condition.icon}">
                    <h1>${current.temp_f}F</h1>
                    <p>Humidity: ${current.humidity} || Wind: ${current.wind_mph}</p>
                    <p>Feels Like: ${current.feelslike_f}</p>
                </div>
                <h1>Next 5 days</h1>
                `);
                $.each(forecast, (idx, forecastday) =>{
                    console.log(`index ${idx} forcast ${forecastday.day.avgtemp_f}`)
                    $(".forecast").append(`
                    <div class="forecast-card">
                    <img src="${forecastday.day.condition.icon}">
                    <p>Min Temp: ${forecastday.day.mintemp_f} || Max Temp: ${forecastday.day.maxtemp_f}</p>
                    <p>Chance of Rain: ${forecastday.day.daily_chance_of_rain}</p>
                    <p>Chance of Snow: ${forecastday.day.daily_chance_of_snow}</p>
                </div>`)
                })
            }).fail(function(e) {
                $(".current").html("")
                $(".forecast").html("")
                $(".current").append(`
                <h1>That City does not Exist</h1>
                `);
              })
        }

        if(zip != ''){
            let zipURL = baseURL + apikey + "&q=" + zip + "&days=5&aqi=no&alerts=no"
            $.getJSON(zipURL, (data) =>{
                $(".current").html("")
                $(".forecast").html("")
                console.log(data)
                let current = data.current
                let forecast = data.forecast.forecastday
                let location = data.location
                console.log(current.condition.icon)
                $(".current").append(`
                <div class="current-card">
                    <h1>${location.name}</h1>
                    <p>${location.country}</p>
                    <img src="${current.condition.icon}">
                    <h1>${current.temp_f}F</h1>
                    <p>Humidity: ${current.humidity} || Wind: ${current.wind_mph}</p>
                    <p>Feels Like: ${current.feelslike_f}</p>
                </div>
                <h1>Next 5 days</h1>
                `);
                $.each(forecast, (idx, forecastday) =>{
                    console.log(`index ${idx} forcast ${forecastday.day.avgtemp_f}`)
                    $(".forecast").append(`
                    <div class="forecast-card">
                    <img src="${forecastday.day.condition.icon}">
                    <p>Min Temp: ${forecastday.day.mintemp_f} || Max Temp: ${forecastday.day.maxtemp_f}</p>
                    <p>Chance of Rain: ${forecastday.day.daily_chance_of_rain}</p>
                    <p>Chance of Snow: ${forecastday.day.daily_chance_of_snow}</p>
                </div>`)
                })
            }).fail(function(e) {
                $(".current").html("")
                $(".forecast").html("")
                $(".current").append(`
                <h1>That Zipcode does not Exist</h1>
                `);
              })
        }

        
        
    })
}
 
$(document).ready(function () {
initListeners();
    // getData()
});