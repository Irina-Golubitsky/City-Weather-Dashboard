let key= "29b980ef45f54cadca300e5a599d2a64";
function GetWeather(){
    console.log('yes');
    let city=$('#city').val();
    console.log(city);
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
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
    let nameH = $('<h4>');

}
let displayFutureWeather=function(city){
    
}
$('#search').click( GetWeather);