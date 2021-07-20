let key = "29b980ef45f54cadca300e5a599d2a64";
let city ="";
let cityList=[];
function GetWeather() {
    city = $('#city').val();
    $('#city').val("");
    displayCityWeather(city,1);
    
}
let displayCityWeather = function (city,newSearch) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    $('#city-weather').empty();
                    let h = $('<h4>');
                    city=data.name;
                    h.text(city + ' (' + moment.unix(data.dt + data.timezone).format("L") + ') '); //??? local date
                    let icon = $('<img>');
                    icon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                    icon.attr("width", 50);
                    h.append(icon);
                    $('#city-weather').append(h);
                    let pTemp = $('<p>'), pWind = $('<p>'), pHum = $('<p>');
                    pTemp.text("Temp: " + data.main.temp + " °F");
                    $('#city-weather').append(pTemp);
                    pWind.text("Wind: " + data.wind.speed + " MPH");
                    $('#city-weather').append(pWind);
                    pHum.text("Humidity: " + data.main.humidity + " %");
                    $('#city-weather').append(pHum);
                    $('#city-weather').addClass('bg-white');
                    var apiURLuv = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${data.coord.lat}&lon=${data.coord.lon}`;
                    fetch(apiURLuv)
                        .then(function (response) {
                            response.json().then(function (dataUv) {
                                pUv = $('<p>');
                                pUv.text("UV Index: ");
                                let sUv = $('<span>');
                                sUv.text(dataUv.value);
                                if (dataUv.value <= 3) {
                                    sUv.addClass('badge badge-success');
                                } else if (dataUv.value > 3 && dataUv.value <= 6) {
                                    sUv.addClass('badge badge-yellow');
                                } else if (dataUv.value > 6 && dataUv.value <= 8) {
                                    sUv.addClass('badge badge-orange');
                                } else if (dataUv.value > 8 && dataUv.value <= 11) {
                                    sUv.addClass('badge badge-danger');
                                } else {
                                    sUv.addClass('badge badge-violet');

                                }

                                pUv.append(sUv);
                                $('#city-weather').append(pUv);
                                displayForecat(city);
                                if (newSearch){
                                    cityList.push(city);
                                    localStorage.setItem('city-list', JSON.stringify(cityList));
                                addCityButton(city);
                                }
                            });
                        })
                        .catch(function (error) {
                            alert("Unable to connect to openweathermap.org");
                        });
                });
            } else {
                $('#forecast').empty();
                $('#forecast').removeClass("bg-white");
                $('#city-weather').empty();
                $('#city-weather').addClass('bg-white');
                $('#city-weather').text("city not found");
            }
        })
        .catch(function (error) {

            alert("Unable to connect to openweathermap.org");
        });


}
let displayForecat = function (city) {
    var apiURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`

    fetch(apiURLForecast)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                let h4 = $('<h4>');
                h4.text("5-Day Forecast: 3 pm");

                $('#forecast').empty();
                $('#forecast').addClass("border-top border-3 p-3 bg-white");
                $('#forecast').append(h4);
                let mainDiv = $('<div>');
                mainDiv.addClass("card-group d-flex flex-wrap");
                for (i = 0; i < data.list.length; i++) {
                    if ((moment(data.list[i].dt_txt)).toString().indexOf("15:00:00") > 0) {
                        let div = $('<div>');
                        div.addClass("card bg-forecast text-light m-2 p-2");
                        let h5 = $('<h5>');
                        h5.text(moment(data.list[i].dt_txt).format("L"));
                        let icon = $('<img>');
                        icon.addClass("mx-auto");
                        icon.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                        icon.attr("width", 75);
                        div.append(h5);
                        div.append(icon);
                        let pTemp = $('<p>'), pWind = $('<p>'), pHum = $('<p>');
                        pTemp.text("Temp: " + data.list[i].main.temp + " °F");
                        div.append(pTemp);
                        pWind.text("Wind: " + data.list[i].wind.speed + " MPH");
                        div.append(pWind);
                        pHum.text("Humidity: " + data.list[i].main.humidity + " %");
                        div.append(pHum);
                        mainDiv.append(div);
                        $('#forecast').append(mainDiv);
                    }
                }
            });
        })
        .catch(function (error) {
            alert("Unable to connect to openweathermap.org");
        });
}
let addCityButton = function (city) {
    if (cityList.length === 1){
        
        lineDiv = $('<div>');
        lineDiv.addClass("border-bottom border-2 mt-2");
        $('#first-row').append(lineDiv);
    }
    cityButton = $('<button>');
    cityButton.addClass('btn btn-secondary mt-2 mb-2 btn-block');
    cityButton.text(city);
    cityButton.on('click', function (event) {
        event.preventDefault();
        displayCityWeather(city,0);})
    $('#first-row').append(cityButton);
}


cityList = JSON.parse(localStorage.getItem('city-list')) || [];
    for (i=0;i<cityList.length;i++){
        addCityButton(cityList[i]);
    }


$('#search').click(GetWeather);