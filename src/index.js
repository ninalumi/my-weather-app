let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${hour}`;
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
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${hour}:${minute} <br/> ${day}, ${date} ${month}`;

function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-value");
  if (event.target.id === "celcius") {
    temperature.innerHTML = 19;
  } else {
    temperature.innerHTML = 66;
  }
}

let changeToC = document.querySelector("#celcius");
changeToC.addEventListener("click", changeUnit);

let changeToF = document.querySelector("#farenheit");
changeToF.addEventListener("click", changeUnit);

function search(city) {
  let apiKey = "c0db0c3b54a9ee6e44d7ea7307ac1973";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(useApi);
}

function callApi(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  city = cityInput.value;
  search(city);
}

let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("submit", callApi);

function useApi(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-value");
  mainTemp.innerHTML = `${temperature}`;
  let description = response.data.weather[0].main;
  let mainDesc = document.querySelector("h4");
  mainDesc.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humValue = document.querySelector("#humidity");
  humValue.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = `${wind} m/s`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempValue = document.querySelector("#max-temp");
  maxTempValue.innerHTML = `${maxTemp} °C`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempValue = document.querySelector("#min-temp");
  minTempValue.innerHTML = `${minTemp} °C`;
  let currentCity = document.querySelector("#current-city");
  let foundCity = response.data.name;
  currentCity.innerHTML = `${foundCity}`;
  let currentCountry = document.querySelector("#current-country");
  let foundCountry = response.data.sys.country;
  currentCountry.innerHTML = `${foundCountry}`;
}

function findCity(event) {
  event.preventDefault();
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "c0db0c3b54a9ee6e44d7ea7307ac1973";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(useApi);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locInput = document.querySelector("#loc-button");
locInput.addEventListener("click", findCity);

search("Amsterdam");
