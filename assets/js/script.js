let key = "29b980ef45f54cadca300e5a599d2a64";
function GetWeather() {
    console.log('yes');
    let city = $('#city').val();
    console.log(city);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {

                // console.log(response);

                response.json().then(function (data) {
                    console.log(data);
                    // console.log(response.data);
                    displayCityWeather(data);
                    displayFutureWeather(city);
                });
            } else {
                alert("city not found");
            }
        })
        .catch(function (error) {
            alert("Unable to connect to openweathermap.org");
        });


}
let displayCityWeather = function (data) {
    $('#city-weather').empty();
    let h = $('<h4>');
    h.text(data.name + ' (' + moment.unix(data.dt).format("L") + ') '); //??? local date
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
    $('#city-weather').addClass('border border-2 m-2');
    var apiURLuv = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${data.coord.lat}&lon=${data.coord.lon}`;
    fetch(apiURLuv)
        .then(function (response) {
            response.json().then(function (dataUv) {
                pUv = $('<p>');
                pUv.text("UV Index: ");
                let sUv = $('<span>');
                sUv.text(dataUv.value);
                var jsLang = 'jquery';
                if (dataUv.value <= 3) {
                    sUv.addClass('badge badge-succes');
                } else if (dataUv.value > 3 && dataUv.value <= 6) {
                    sUv.addClass('badge badge-yellow');
                    console.log('yellow');
                } else if (dataUv.value > 6 && dataUv.value <= 8) {
                    sUv.addClass('badge badge-orange');
                } else if (dataUv.value > 8 && dataUv.value <= 11) {
                    sUv.addClass('badge badge-danger');
                } else {

                    sUv.addClass('badge badge-violet');

                }

                pUv.append(sUv);
                $('#city-weather').append(pUv);
            });
        })
        .catch(function (error) {
            alert("Unable to connect to openweathermap.org");
        });

}
let displayFutureWeather = function (city) {

}
$('#search').click(GetWeather);