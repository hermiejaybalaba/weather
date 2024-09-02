document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'bc66caec3ac14f048fb61159241908';
    const form = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input'); 
    const weatherContainer = document.getElementById('weather');
  
    async function fetchWeather(cityName) {
      const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}`;
  
      try {
        const response = await fetch(apiEndpoint); 
        if (!response.ok) throw new Error('Network response was not ok'); 
        const weatherData = await response.json(); 
        const temperatureInCelsius = weatherData.current.temp_c;
        const weatherDescription = weatherData.current.condition.text;
        const humidityLevel = weatherData.current.humidity;
  
     
        const localTime = weatherData.location.localtime;
        const date = new Date(localTime);
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[date.getDay()]; 
  
  
        const localTimeFormatted = `${dayOfWeek}, ${date.toLocaleTimeString()}`;
  
        weatherContainer.innerHTML = `
          <h2>${cityName}</h2>
          <p><strong>Temperature:</strong> ${temperatureInCelsius}°C</p>
          <p class="weather"><strong>Weather:</strong> ${weatherDescription}</p>
          <p><strong>Humidity:</strong> ${humidityLevel}%</p>
          <p class="time"><strong>Local Time:</strong> ${localTimeFormatted}</p>
        `;
      } catch (error) {
        weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
      }
    }
  
  
    fetchWeather('Iligan City');
  
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      const cityName = cityInput.value.trim(); 
      if (cityName) {
        fetchWeather(cityName); 
      }
    });
  });
  