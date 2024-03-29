
      function formatDate (timestamp) {
        let date = new Date(timestamp);
        let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = days[date.getDay()];

        return `${day} ${formatHours(timestamp)}`;
      }

      function showTemp(response) { 
        celsiusTemperature = response.data.main.temp; 

         document.querySelector("#searchedCity").innerHTML = response.data.name;
         document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
         document.querySelector("#humidity").innerHTML = response.data.main.humidity;
         document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
         document.querySelector("#currentWeather").innerHTML = response.data.weather[0].description;
         document.querySelector("#currentDate").innerHTML = formatDate(response.data.dt*1000);
         document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
         document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
       }
      
      function formatHours (timestamp) {
        let date = new Date(timestamp);
        let hours = date.getHours();
          if (hours < 10) {
             hours = `0${hours}`;
          }
        let minutes = date.getMinutes();
          if (minutes < 10) {
             minutes = `0${minutes}`;
          }
        let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = days[date.getDay()];


        return `${hours}:${minutes}`;
      }

      function displayForecast(response) {
        let forecastElement = document.querySelector("#forecast"); 
        forecastElement.innerHTML = null;
        let forecast = null;


        for (let index = 0; index < 6; index++) {
          forecast = response.data.list[index];
          forecastElement.innerHTML += `
           <div class="col-2">
              <h3>
                ${formatHours(forecast.dt * 1000)}
              </h3>
              <img
               src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
               />
             <div class="weather-forecast-temperature">
                <strong>
                ${Math.round(forecast.main.temp_max)}º
                </strong>
                <div class="weather-forecast-temp-min"> 
                ${Math.round(forecast.main.temp_min)}º
                </div> 
              </div>
            </div>
          `;
        }
      }

      function searchCity (city){
        let apiKey = "755fa0d585548b254a8058369f909e72";
        let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showTemp);

        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
       }

     function handleSubmit(event) {
        event.preventDefault();
        let city = document.querySelector("#city-input").value;
        searchCity(city);
       }

     function searchLocation (position) {
        let apiKey = "755fa0d585548b254a8058369f909e72";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showTemp);
       }
    
      function getCurrentLocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
       }
      

     function displayFahrenheitTemperature(event) {
       event.preventDefault();
       let temperatureElement = document.querySelector("#temperature");
       celsiusLink.classList.remove("active");
       fahrenheitLink.classList.add("active");
       let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
       temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
     }

     function displayCelsiusTemperature (event) {
       event.preventDefault();
       celsiusLink.classList.add("active");
       fahrenheitLink.classList.remove("active");
       let temperatureElement = document.querySelector("#temperature");
       temperatureElement.innerHTML = Math.round(celsiusTemperature);
     }

   let celsiusTemperature = null;

   let currentLocationButton = document.querySelector("#current-location-button");
   currentLocationButton.addEventListener ("click", getCurrentLocation);   

   let fahrenheitLink = document.querySelector("#fahrenheit-link");
   fahrenheitLink.addEventListener ("click", displayFahrenheitTemperature);
   
   let celsiusLink = document.querySelector("#celsius-link");
   celsiusLink.addEventListener ("click", displayCelsiusTemperature);
   


   searchCity("New York"); 