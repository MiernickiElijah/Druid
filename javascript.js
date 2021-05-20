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


// click on previous city search and run same function with that input// 
var buttonClickHandler = function (event) {
    var previousSearch = event.target.getAttribute('data-search');
    if (previousSearch) {
        getPreviousSearch(previousSearch);
        weatherContainer.textContent = '';
    }
};

//Fetch the weather data ------------------api key==2383d7893c8a1fe82e9a615e9b9086f9//
var getWeatherData = function (city) {
    //find the city's lat & lon//
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=2383d7893c8a1fe82e9a615e9b9086f9';
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data[0]);
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    //fetch weather using previous fetched lat & lon//
                    var latlonData = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=2383d7893c8a1fe82e9a615e9b9086f9';
                    fetch(latlonData).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                            })
                        }
                    })
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
};

var getPreviousSearch = function (previousSearch) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + previousSearch + '&limit=3&appid=2383d7893c8a1fe82e9a615e9b9086f9';
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data.items, previousSearch);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};


var displayWeather = function (data) {
    if (data[0].length === 0) {
        $("#weatherContainer").text('No weather data found.');
        return;
    }

    $("#temp").text(data.current.temp)

    for (var i = 0; i < data.length; i++) {

    }
};


searchBtn.addEventListener('submit', formSubmitHandler);