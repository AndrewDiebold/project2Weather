




const init = () => {
  let weatherButton = document.querySelector("#getWeather");
  weatherButton.addEventListener("click", getLocation,);
}

const getWeather = (lat, lng, sunrise, sunset, currentTime) => {

  let api = "http://api.geonames.org/findNearByWeatherJSON?username=AndrewDiebold&lat=";
  let apiLng = "&lng=";

  let url = api + lat + apiLng + lng;
  let xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let tempC = data.weatherObservation.temperature;
      let windSpeed = data.weatherObservation.windSpeed;
      let windDirection = data.weatherObservation.windDirection;
      let cloudsCode = data.weatherObservation.cloudsCode;
      let cloudsName = data.weatherObservation.clouds;
      let dewPointC = data.weatherObservation.dewPoint;
      let humidity = data.weatherObservation.humidity;

      let tempF = (tempC * 9/5) + 32;
      let dewPointF = (dewPointC * 9/5) + 32;

      if (windDirection >= 350 && windDirection <= 10) {
        windDirection = "N";
      } else if (windDirection >= 20 && windDirection <= 30) {
        windDirection = "N/NE";
      } else if (windDirection >= 40 && windDirection <= 50) {
        windDirection = "NE";
      } else if (windDirection >= 60 && windDirection <= 70) {
        windDirection = "E/NE";
      } else if (windDirection >= 80 && windDirection <= 100) {
        windDirection = "E";
      } else if (windDirection >= 110 && windDirection <= 120) {
        windDirection = "E/SE";
      } else if (windDirection >= 130 && windDirection <= 140) {
        windDirection = "SE";
      } else if (windDirection >= 150 && windDirection <= 160) {
        windDirection = "S/SE";
      } else if (windDirection >= 170 && windDirection <= 190) {
        windDirection = "S";
      } else if (windDirection >= 200 && windDirection <= 210) {
        windDirection = "S/SW";
      } else if (windDirection >= 220 && windDirection <= 230) {
        windDirection = "SW";
      } else if (windDirection >= 240 && windDirection <= 250) {
        windDirection = "W/SW";
      } else if (windDirection >= 260 && windDirection <= 280) {
        windDirection = "W";
      } else if (windDirection >= 290 && windDirection <= 300) {
        windDirection = "W/NW";
      } else if (windDirection >= 310 && windDirection <= 320) {
        windDirection = "NW";
      } else {
        windDirection = "N/NW";
      }

      if (cloudsCode == "SKC" || cloudsCode == "CLR" || cloudsCode == "NCD" || cloudsCode == "NSC" || cloudsCode == "CAVOK") {
        if(currentTime < sunrise){
          document.getElementById("wrapper").style.background = "url(./imgs/moon-solid.png) no-repeat center";
        } else if (currentTime > sunrise && currentTime < sunset){
          document.getElementById("wrapper").style.background = "url(./imgs/sun-solid.png) no-repeat center";
        } else {
          document.getElementById("wrapper").style.background = "url(./imgs/moon-solid.png) no-repeat center";
        }
      } else if (cloudsCode == "SCT" || cloudsCode == "BKN" || cloudsCode == "FEW"){
        if(currentTime < sunrise){
          document.getElementById("wrapper").style.background = "url(./imgs/cloud-moon-solid.png) no-repeat center";
        } else if (currentTime > sunrise && currentTime < sunset){
          document.getElementById("wrapper").style.background = "url(./imgs/cloud-sun-solid.png) no-repeat center";
        } else {
          document.getElementById("wrapper").style.background = "url(./imgs/cloud-moon-solid.png) no-repeat center";
        }
      } else if (cloudsCode == "OVC"){
        document.getElementById("wrapper").style.background = "url(./imgs/cloud-solid.png) no-repeat center";
      } else if (cloudsCode == "VV"){
        document.getElementById("wrapper").style.background = "url(./imgs/smog-solid.png) no-repeat center";
      } else if (tempF > 80){
        document.getElementById("wrapper").style.background = "url(./imgs/temperature-high-solid.png) no-repeat center";
      } else if (tempF < 40){
        document.getElementById("wrapper").style.background = "url(./imgs/temperature-low-solid.png) no-repeat center";
      } else if (cloudsName == "n/a") {
        document.getElementById("wrapper").style.background = "";
      }

      document.getElementById("locationTemp").innerHTML ="<h1>" + tempF.toFixed(0) + "&degF</h1>";

      document.getElementById("locationWindInfo").innerHTML =
          "<h3>Wind:</h3><h4>" + parseInt(windSpeed) + " mph " + windDirection + "</h4>";

      document.getElementById("dewPointInfo").innerHTML =
          "<h3>Dew Point:</h3><h4>" + dewPointF.toFixed(0) + "&degF</h4>";

      document.getElementById("humidityInfo").innerHTML =
          "<h3>Humidity:</h3><h4>" + humidity + "%</h4>";

      console.log(place);
      console.log(lat);
      console.log(lng);
      console.log(tempF.toFixed(0));
      console.log(windSpeed);
      console.log(windDirection);
      console.log(cloudsCode);
      console.log(cloudsName);
      console.log(dewPointF);
      console.log(humidity);
      console.log(sunrise);
      console.log(sunset);
      console.log(currentTime);

    }
  }
  xhr.send(null);

}

const getTimezone = (lat, lng) => {

  let api = "http://api.geonames.org/timezoneJSON?username=AndrewDiebold&lat=";
  let apiLng = "&lng=";

  let url = api + lat + apiLng + lng;
  let xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);
      let timezone = data.timezoneId;
      let sunrise = data.sunrise;
      let sunset = data.sunset;
      let currentTime = data.time;

      getWeather(lat, lng, sunrise, sunset, currentTime);
    }
  }
  xhr.send(null);

}

const getLocation = () => {

  let zipCode = document.getElementById("zip").value;
  document.getElementById("wrapper").style.background = "";

  if (zipCode.length == 0) {
    alert("Please enter a zip code");
    return false;
  } else if (zipCode.length != 5) {
    alert("Zip code must be five numbers");
    return false;
  } else {

  let api = "http://api.geonames.org/postalCodeSearchJSON?username=AndrewDiebold&country=US&postalcode=";
  let url = api + zipCode;
  let xhr = new XMLHttpRequest();

  xhr.open("get", url);

  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4) {
      let data = JSON.parse(xhr.responseText);

      if (data.postalCodes[0] == null) {
        alert("Zip code entered does not exist");
        return false;
      }

      let lat = data.postalCodes[0].lat;
      let lng = data.postalCodes[0].lng;
      let place = data.postalCodes[0].placeName;
      let state = data.postalCodes[0].adminCode1;

      getTimezone(lat, lng);

      document.getElementById("location").innerHTML =
          "<h5>" + place + ", " + state + "</h5>";

    }
  }
  xhr.send(null);
  }
}

window.onload = init;
