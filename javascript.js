var searchBtn = document.querySelector('#user-form');
var weatherContainer = document.querySelector('#list-group')
var city = document.querySelector("#form-input")

//on searchbtn click run input field//
var formSubmitHandler = function (event) {
    event.preventDefault();

    getWeatherData();
    if (getWeatherData == null)
        alert('City was not found');
};


// click on previous city search and run same function with that input// 
var buttonClickHandler = function (event) {
    var previousSearch = event.target.getAttribute('data-search');

    if (previousSearch) {
        getpreviousSearch(previousSearch);
        weatherContainer.textContent = '';
    }
};

//Fetch the weather data ------------------api key 2383d7893c8a1fe82e9a615e9b9086f9 //
var getWeatherData = function (City) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=3&appid=2383d7893c8a1fe82e9a615e9b9086f9';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to One Call');
        });
};

var getpreviousSearch = function (previousSearch) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + previousSearch + '&limit=3&appid=2383d7893c8a1fe82e9a615e9b9086f9';

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


var displayWeather = function (city, searchTerm) {
    if (city.length === 0) {
        weatherContainer.textContent = 'No weather data found.';
        return;
    }

    city.textContent = searchTerm;

    for (var i = 0; i < city.length; i++) {
        var weatherEl = document.createElement('div');
        weatherEl.classList = 'list-item flex-row justify-space-between align-center';

        var titleEl = document.createElement('span');
        titleEl.textContent = cityName;

        cityName.appendChild(titleEl);

        var weatherData = document.createElement('span');
        weatherData.classList = 'flex-row align-center';

        if (city[i].open_issues_count > 0) {
            weatherData.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + city[i].open_issues_count + ' issue(s)';
        } else {
            weatherData.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //this is where the weather data is added to the DOM//
        cityName.appendChild(weatherData);
        weatherContainer.appendChild(cityName);
    }
};


searchBtn.addEventListener('submit', formSubmitHandler);