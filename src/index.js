let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
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
  celciusTemp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-value");
  mainTemp.innerHTML = `${celciusTemp}`;
  let mainDesc = document.querySelector("h4");
  mainDesc.innerHTML = response.data.weather[0].main;
  let humValue = document.querySelector("#humidity");
  humValue.innerHTML = response.data.main.humidity;
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = Math.round(response.data.wind.speed);
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempValue = document.querySelector("#max-temp");
  maxTempValue.innerHTML = `${maxTemp} °C`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempValue = document.querySelector("#min-temp");
  minTempValue.innerHTML = `${minTemp} °C`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentCountry = document.querySelector("#current-country");
  currentCountry.innerHTML = response.data.sys.country;
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

function changetoF(event) {
  event.preventDefault();
  changeToC.classList.remove("active");
  changeToF.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let mainTemp = document.querySelector("#temp-value");
  mainTemp.innerHTML = Math.round(fahrenheitTemp);
}

function changetoC(event) {
  event.preventDefault();
  changeToC.classList.add("active");
  changeToF.classList.remove("active");
  let mainTemp = document.querySelector("#temp-value");
  mainTemp.innerHTML = celciusTemp;
}

let celciusTemp = null;

let changeToC = document.querySelector("#celcius");
changeToC.addEventListener("click", changetoC);

let changeToF = document.querySelector("#farenheit");
changeToF.addEventListener("click", changetoF);

let locInput = document.querySelector("#loc-button");
locInput.addEventListener("click", findCity);

search("Amsterdam");
