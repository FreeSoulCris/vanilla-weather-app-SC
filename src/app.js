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
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");

  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humidity");

  let windElement = document.querySelector("#wind");

  let dateElement = document.querySelector("#date");

  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  cityElement.innerHTML = response.data.city;

  descriptionElement.innerHTML = response.data.condition.description;

  humidityElement.innerHTML = response.data.temperature.humidity;

  windElement.innerHTML = Math.round(response.data.wind.speed);

  dateElement.innerHTML = formatDate(response.data.time * 1000);
  // Revisar tema iconos, me salta el primero de la lista de la API pero no se pone el icono correcto. ¿como lo soluciono, hay que hacer un array?

  // solucionar que primero cargue icono HTML y luego icono API

  iconElement.setAttribute("src", response.data.condition.icon_url);

  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let key = "0239330ab540e803o5b4f9t7e63fbef4";
  let units = "metric";
  // he borrado el id city al crear el form
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=new_york&key=0239330ab540e803o5b4f9t7e63fbef4&units=metric`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);

  console.log(cityInputElement.value);
}
// revisar funcionamiento form - no busca el valor introducido.

search("New York");

let key = "0239330ab540e803o5b4f9t7e63fbef4";
let query = "New York";
let units = "metric";

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=new_york&key=0239330ab540e803o5b4f9t7e63fbef4&units=metric`;

//let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}&units={units}`;

// https://www.shecodes.io/learn/apis/weather

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
