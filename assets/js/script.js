let key= "29b980ef45f54cadca300e5a599d2a64";
function GetWeather(){
    console.log('yes');
    let city=$('#city').val();
    console.log(city);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {

            // console.log(response);
          
          response.json().then(function(data) {
             console.log(data);
            // console.log(response.data);
            displayCityWeather(data);
            displayFutureWeather(city);
          });
        } else {
          alert("city not found");
        }
      })
      .catch(function(error) {
        alert("Unable to connect to openweathermap.org");
      });


}
let displayCityWeather=function(data){
    $('#city-weather').empty();
    let h = $('<h4>');
    h.text(data.name+ ' ('+moment.unix(data.dt).format("L")+') '); //??? local date
    let icon=$('<img>');
    icon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    icon.attr("width", 50);
    h.append(icon);
    $('#city-weather').append(h);
    let p1 = $('<p>'), p2 = $('<p>'), p3 = $('<p>');
    p1.text("Temp: "+ data.main.temp + " °F");
    $('#city-weather').append(p1);
    p2.text("Wind: "+ data.wind.speed + " MPH");
    $('#city-weather').append(p2);
    p3.text("Humidity: " + data.main.humidity + " %");
    $('#city-weather').append(p3);
    $('#city-weather').addClass('border border-2 m-2');

}
let displayFutureWeather=function(city){
    
}
$('#search').click( GetWeather);