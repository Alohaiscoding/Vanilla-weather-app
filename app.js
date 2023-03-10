function formatDate(timestamp) {
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  console.log(forecast);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
  <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
    forecastDay.condition.icon
  }.png" 
  alt=""
  width="42"/>
  <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">${Math.round(
      forecastDay.temperature.maximum
    )}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(
      forecastDay.temperature.minimum
    )}°</span>
  </div>
</div>
`;
    }
  });

  forecast.innerHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "08d54a034ao7702ct57a2eb3f9ba0acb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let temperatureFeel = document.querySelector("#feels");
  temperatureFeel.innerHTML = Math.round(response.data.temperature.feels_like);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "508d54a034ao7702ct57a2eb3f9ba0acb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=08d54a034ao7702ct57a2eb3f9ba0acb&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}
function displayFahrenheintTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiuslink.classList.remove("active");
  Fahrenheintlink.classList.add("active");
  let fahrenheintTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheintTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  Fahrenheintlink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let Fahrenheintlink = document.querySelector("#fahnrenheit-link");
Fahrenheintlink.addEventListener("click", displayFahrenheintTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsiusTemperature);

function currentCity(response) {
  let city = document.querySelector(".city");
  city.innerHTML = `${response.data.city}`;
}
search("Sydney");
