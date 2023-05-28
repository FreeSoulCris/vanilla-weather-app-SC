function formatDate(timestamp) {
  // calculate the date
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-date">${formatForecastDay(
                  forecastDay.time
                )}</div>
                

                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="42px"
                />
                <div class="weather-forecast-temperatures">
                  <span id="weather-forecast-temperature-max" class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}º</span>
                  <span id="weather-forecast-temperature-min" class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}º</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "0239330ab540e803o5b4f9t7e63fbef4";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");

  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");

  let dateElement = document.querySelector("#date");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  cityElement.innerHTML = response.data.city;

  descriptionElement.innerHTML = response.data.condition.description;

  humidityElement.innerHTML = response.data.temperature.humidity;

  windElement.innerHTML = Math.round(response.data.wind.speed);

  dateElement.innerHTML = formatDate(response.data.time * 1000);

  // solucionar que primero cargue icono HTML y luego icono API

  iconElement.setAttribute("src", response.data.condition.icon_url);

  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);

  updateForecastTemperature("celsius");

  descriptionElement.innerHTML = response.data.condition.description;
  // Cambiar clase de fondo del body según el valor de description
  let bodyElement = document.querySelector("body");
  let weatherDescription = response.data.condition.icon_url.toLowerCase();

  if (weatherDescription.includes("clear-sky-day")) {
    bodyElement.className = "weather-background-clear-sky-day";
  } else if (weatherDescription.includes("clear-sky-night")) {
    bodyElement.className = "weather-background-clear-sky-night";
  } else if (weatherDescription.includes("few-clouds-day")) {
    bodyElement.className = "weather-background-few-clouds-day";
  } else if (weatherDescription.includes("few-clouds-night")) {
    bodyElement.className = "weather-background-few-clouds-night";
  } else if (weatherDescription.includes("scattered-clouds")) {
    bodyElement.className = "weather-background-scattered-clouds";
  } else if (weatherDescription.includes("broken-clouds-day")) {
    bodyElement.className = "weather-background-broken-clouds-day";
  } else if (weatherDescription.includes("broken-clouds-night")) {
    bodyElement.className = "weather-background-broken-clouds-night";
  } else if (weatherDescription.includes("rain-day")) {
    bodyElement.className = "weather-background-rain-day";
  } else if (weatherDescription.includes("light-rain-night")) {
    bodyElement.className = "weather-background-rain-night";
  } else if (weatherDescription.includes("rain-day")) {
    bodyElement.className = "weather-background-rain-day";
  } else if (weatherDescription.includes("rain-night")) {
    bodyElement.className = "weather-background-rain-night";
  } else if (weatherDescription.includes("thunderstorm-day")) {
    bodyElement.className = "weather-background-thunderstorm-day";
  } else if (weatherDescription.includes("thunderstorm-night")) {
    bodyElement.className = "weather-background-thunderstorm-night";
  } else if (weatherDescription.includes("snow-day")) {
    bodyElement.className = "weather-background-snow-day";
  } else if (weatherDescription.includes("snow-night")) {
    bodyElement.className = "weather-background-snow-night";
  } else if (weatherDescription.includes("mist-night")) {
    bodyElement.className = "weather-background-mist-night";
  } else if (weatherDescription.includes("mist-day")) {
    bodyElement.className = "weather-background-mist-day";
  } else {
    bodyElement.className = ""; // Si no coincide con ninguna descripción, eliminar todas las clases
  }
}

function search(city) {
  let key = "0239330ab540e803o5b4f9t7e63fbef4";
  let units = "metric";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  // remove the active class from the Celsius link & add the active class to the Fahrenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  updateForecastTemperature("fahrenheit"); // Se actualiza el forecast
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  updateForecastTemperature("celsius"); // Se actualiza el forecast
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function convertToCelsius(temperature) {
  return ((temperature - 32) * 5) / 9;
}

function convertToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

function convertTemperature(metric, temperature) {
  if (metric === "celsius") {
    return convertToCelsius(temperature);
  } else {
    return convertToFahrenheit(temperature);
  }
}

function updateForecastTemperature(metric) {
  let maxTemperatureElements = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  let minTemperatureElements = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );

  maxTemperatureElements.forEach(function (element) {
    let temperature = parseFloat(element.textContent);
    element.textContent =
      Math.round(convertTemperature(metric, temperature)) + "°";
  });

  minTemperatureElements.forEach(function (element) {
    let temperature = parseFloat(element.textContent);
    element.textContent =
      Math.round(convertTemperature(metric, temperature)) + "°";
  });
}

search("Barcelona");
