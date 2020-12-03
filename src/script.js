
      function formatDate (timestamp) {
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

        return `${day} ${hours}:${minutes}`;
      }

      function showTemp(response) { 
        console.log(response);
         document.querySelector("#searchedCity").innerHTML = response.data.name;
         document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
         document.querySelector("#humidity").innerHTML = response.data.main.humidity;
         document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
         document.querySelector("#currentWeather").innerHTML = response.data.weather[0].main;
         document.querySelector("#currentDate").innerHTML = formatDate(response.data.dt*1000);
       }

      function searchCity (city){
        let apiKey = "755fa0d585548b254a8058369f909e72";
        let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(showTemp);
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


   let currentLocationButton = document.querySelector("#current-location-button");
   currentLocationButton.addEventListener ("click", getCurrentLocation);

   searchCity("New York"); 