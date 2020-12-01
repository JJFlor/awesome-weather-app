function setTime() {
         let currentDate = document.querySelector("#currentDate");
         let now = new Date();

         let days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
         let day = days[now.getDay()];
    
         let hours = now.getHours();
         let minutes = now.getMinutes();
    
           if (minutes < 10) {
             minutes = `0${minutes}`;
           }
    
         let currentDayText = `${day}, ${hours}:${minutes}`;
          currentDate.innerHTML = currentDayText;
       }

      function showTemp(response) { 
         document.querySelector("#searchedCity").innerHTML = response.data.name;
         document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
         document.querySelector("#humidity").innerHTML = response.data.main.humidity;
         document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
         document.querySelector("#currentWeather").innerHTML = response.data.weather[0].main;
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

      //function showFiveDaysForecast (response) {
      //document.querySelector("#fiveDaysForecast").innerHTML = apiUrl; 
      //console.log(apiUrl);
      //}
    
      //function getFiveDaysForecast(event) {
         //event.preventDefault();
         //let apiKey = "755fa0d585548b254a8058369f909e72";
         //let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
         //axios.get(apiUrl).then(showFiveDaysForecast);
       //}


   let currentLocationButton = document.querySelector("#current-location-button");
   currentLocationButton.addEventListener ("click", getCurrentLocation);

   searchCity("New York"); 