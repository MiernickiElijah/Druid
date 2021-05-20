var searchBtn = document.querySelector('#user-form');
var weatherContainer = document.querySelector('#list-group')
var city = document.querySelector(".form-input")


//on searchbtn click run input field//
var formSubmitHandler = function (event) {
    event.preventDefault();

    getWeatherData(city.value);
    if (getWeatherData == null)
        alert('City was not found');
};


//on previous city btnclick run getWeatherData// 
var buttonClickHandler = function (event) {
    event.preventDefault();

    var previousSearch = event.target.getAttribute('data-search');
    if (previousSearch) {
        getPreviousSearch(previousSearch);
        weatherContainer.textContent = '';
    }
};

//Fetch the weather data ------------------key==2383d7893c8a1fe82e9a615e9b9086f9//
var getWeatherData = function (city) {
    //find the city's lat & lon//
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=2383d7893c8a1fe82e9a615e9b9086f9';
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data[0]);
                    //write city to DOM//
                    $("#city").text(data[0].name + ', ' + data[0].state);
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    //fetch weather using previous fetched lat & lon//
                    var latlonData = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=2383d7893c8a1fe82e9a615e9b9086f9';
                    fetch(latlonData).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                //write date to DOM//
                                const unixTimeStamp = (data.current.dt)
                                const milliseconds = unixTimeStamp * 1000
                                const dateObject = new Date(milliseconds);
                                const humanDateFormat = dateObject.toLocaleString();
                                //write weather data and icon to DOM//
                                $("#date").text("(" + humanDateFormat + ")");
                                $("#weatherIcon").text(data.current.weather.icon);
                                $("#temp").text(data.current.temp + "\u00B0 F");
                                $("#wind").text(data.current.wind_speed + " MPH");
                                $("#hum").text(data.current.humidity + "%");
                                $("#uvi").text(data.current.uvi);
                                //change uvi with value//
                                if ((data.current.uvi) <= 7 && (data.current.uvi) > 3) {
                                    $("#uvi").css({ "background-color": "orange", "color": "white", "border-radius": "5px", "padding": "10px" });
                                } else if ((data.current.uvi) <= 3) {
                                    $("#uvi").css({ "background-color": "green", "color": "white", "border-radius": "5px", "padding": "10px" });
                                } else $("#uvi").css({ "background-color": "red", "color": "white", "border-radius": "5px", "padding": "10px" });
                                //5 day weather forecast//



                            })
                        }
                    })
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
};








// var getPreviousSearch = function (previousSearch) {
//     var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + previousSearch + '&limit=3&appid=2383d7893c8a1fe82e9a615e9b9086f9';
//     fetch(apiUrl).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 displayWeather(data.items, previousSearch);
//             });
//         } else {
//             alert('Error: ' + response.statusText);
//         }
//     });
// };


searchBtn.addEventListener('submit', formSubmitHandler);