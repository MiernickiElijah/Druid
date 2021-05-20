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
                                const humanDateFormat = dateObject.toLocaleDateString();
                                //write weather data and icon to DOM//
                                $("#date").text("(" + humanDateFormat + ")");
                                $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
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
                                //5day weather forecast 1//
                                const unixTimeStamp1 = (data.daily[0].dt)
                                const milliseconds1 = unixTimeStamp1 * 1000
                                const dateObject1 = new Date(milliseconds1);
                                const humanDateFormat1 = dateObject1.toLocaleDateString();
                                $("#weatherIcon1").attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png");
                                $("#date1").text(humanDateFormat1);
                                $("#temp1").text(data.daily[0].temp.day + "\u00B0 F");
                                $("#wind1").text(data.daily[0].wind_speed + " MPH");
                                $("#hum1").text(data.daily[0].humidity + "%");
                                //day2//
                                const unixTimeStamp2 = (data.daily[1].dt)
                                const milliseconds2 = unixTimeStamp2 * 1000
                                const dateObject2 = new Date(milliseconds2);
                                const humanDateFormat2 = dateObject2.toLocaleDateString();
                                $("#weatherIcon2").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png");
                                $("#date2").text(humanDateFormat2);
                                $("#temp2").text(data.daily[1].temp.day + "\u00B0 F");
                                $("#wind2").text(data.daily[1].wind_speed + " MPH");
                                $("#hum2").text(data.daily[1].humidity + "%");
                                //day3//
                                const unixTimeStamp3 = (data.daily[2].dt)
                                const milliseconds3 = unixTimeStamp3 * 1000
                                const dateObject3 = new Date(milliseconds3);
                                const humanDateFormat3 = dateObject3.toLocaleDateString();
                                $("#weatherIcon3").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png");
                                $("#date3").text(humanDateFormat3);
                                $("#temp3").text(data.daily[2].temp.day + "\u00B0 F");
                                $("#wind3").text(data.daily[2].wind_speed + " MPH");
                                $("#hum3").text(data.daily[2].humidity + "%");
                                //day4//
                                const unixTimeStamp4 = (data.daily[3].dt)
                                const milliseconds4 = unixTimeStamp4 * 1000
                                const dateObject4 = new Date(milliseconds4);
                                const humanDateFormat4 = dateObject4.toLocaleDateString();
                                $("#weatherIcon4").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png");
                                $("#date4").text(humanDateFormat4);
                                $("#temp4").text(data.daily[3].temp.day + "\u00B0 F");
                                $("#wind4").text(data.daily[3].wind_speed + " MPH");
                                $("#hum4").text(data.daily[3].humidity + "%");
                                //day5//
                                const unixTimeStamp5 = (data.daily[4].dt)
                                const milliseconds5 = unixTimeStamp5 * 1000
                                const dateObject5 = new Date(milliseconds5);
                                const humanDateFormat5 = dateObject5.toLocaleDateString();
                                $("#weatherIcon5").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png");
                                $("#date5").text(humanDateFormat5);
                                $("#temp5").text(data.daily[4].temp.day + "\u00B0 F");
                                $("#wind5").text(data.daily[4].wind_speed + " MPH");
                                $("#hum5").text(data.daily[4].humidity + "%");
                            })
                        }
                    })
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
};

function createPreviousBtn(event) {
    event.preventDefault();
    var search = $('<button type=“button”> ' + city.value + ' </button>').addClass("btn");
    $("#insertPreviousBtn").append(search);
};

//rerun function for previous search//





searchBtn.addEventListener('submit', formSubmitHandler);
searchBtn.addEventListener('submit', createPreviousBtn);