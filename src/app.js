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
}

function search(city) {
  let key = "0239330ab540e803o5b4f9t7e63fbef4";
  let units = "metric";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log("handleSubmit");
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);

  console.log(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  // remove the active class the celsius link & add active class to fahrenheit link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Barcelona");
