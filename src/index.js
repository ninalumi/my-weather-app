function formatDate(timestamp) {
  let fullDate = new Date(timestamp);
  let hours = fullDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = fullDate.getMinutes();
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

  let date = fullDate.getDate();

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

  let month = months[fullDate.getMonth()];
  let day = days[fullDate.getDay()];
  return `${hours}:${minutes} <br /> ${day}, ${date} ${month}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = row>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 weekday">
               <span class="eachDay">${formatDay(forecastDay.dt)}</span>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" width="38" />
        <br/>
        <br/>
        ${Math.round(forecastDay.temp.max)}°C
        <span class="fcMin">${Math.round(forecastDay.temp.min)}°C</span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c0db0c3b54a9ee6e44d7ea7307ac1973";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

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

function useApi(response) {
  celciusTemp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temp-value");
  mainTemp.innerHTML = `${celciusTemp}`;
  let mainDesc = document.querySelector("h4");
  mainDesc.innerHTML = response.data.weather[0].description;
  let humValue = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humValue.innerHTML = `${humidity} %`;
  let windValue = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windValue.innerHTML = `${wind} m/s`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempValue = document.querySelector("#max-temp");
  maxTempValue.innerHTML = `${maxTemp}°C`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempValue = document.querySelector("#min-temp");
  minTempValue.innerHTML = `${minTemp}°C`;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentCountry = document.querySelector("#current-country");
  currentCountry.innerHTML = response.data.sys.country;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let imageElement = document.querySelector("#main-pic");
  imageElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
  getForecast(response.data.coord);
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

let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("submit", callApi);

let celciusTemp = null;

let changeToC = document.querySelector("#celcius");
changeToC.addEventListener("click", changetoC);

let changeToF = document.querySelector("#farenheit");
changeToF.addEventListener("click", changetoF);

let locInput = document.querySelector("#loc-button");
locInput.addEventListener("click", findCity);

search("Amsterdam");
