document.addEventListener('DOMContentLoaded',() => {
  input.addEventListener('keydown',(e) => {
   if(e.key === "Enter") {
    forReadCity();
   }
  })
})

const input = document.getElementById("textInput");
const searchBtn = document.getElementById("search");
const weatherResult = document.querySelector(".box1");


const cityName = document.getElementById("forCity");
const pressure = document.getElementById("pressureElm");
const condition1 = document.getElementById("conditionElm");
const humidity1 = document.getElementById("humidityElm");
const windSpeed = document.getElementById("windElm");
const weatherType = document.getElementById("weatherElm");
const visible = document.getElementById("visibleElm");
const feelTemp = document.getElementById("feelElm");
const sunriseDiv = document.getElementById("sunriseElm");
const sunsetDiv = document.getElementById("sunsetElm");


function forReadCity() {
  const city = input.value.trim();
  searchByCity(city);
  }


function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })

}
  async function userLiveWeather() {
  try{
    const position = await getGeolocation();
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const apiKey = "d168138aee827e4cac2584f61eddc0ba";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    console.log(lat, lon);

  renderData(data);
  }catch(err) {
    weatherResult.innerHTML ="network error or Unable to find weather update";
    console.log("error",err);
  }
  
  }

async function searchByCity(city) {
   
  if(!city) {
    weatherResult.innerHTML ='enter a city name'
    return;
  }
    try{
      const key = "d168138aee827e4cac2584f61eddc0ba";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    const response = await fetch(url);
    
    const data = await response.json();

    renderData(data);
    }catch(err) {
        weatherResult.innerHTML ="network error or Unable to find weather update";
      console.log("error",err);
    }
   
    input.value = "";
}



//get weather for live location


userLiveWeather();

function renderData(data) {

if(!data || Number(data.cod) !== 200) {
     clearWeather()
      weatherResult.innerHTML = "no weather update found with this name";
    return;

    
  }
   weatherResult.innerHTML = "";

  const city = data.name;
  const temperature =data.main.temp;
  const condition = data.weather[0].description;
  const humidity = data.main.humidity;
  const speed = data.wind.speed;
  const visibility = data.visibility / 1000;
  const weather = data.weather[0].main;
  const feelLike = data.main.feels_like;
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  const country = data.sys.country;
  const iconCode = data.weather[0].icon;
  const airPressure = data.main.pressure;
 
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 
  
  pressure.innerHTML = `<p><br>Air pressure:<br>${airPressure} hPa</p>`;
 condition1.innerHTML = ` <p><br>Condition:<br>${condition}</p>`;
  humidity1.innerHTML = ` <p><br>Humidity:<br>${humidity} %</p>`;
  windSpeed .innerHTML = `<p><br>wind Speed:<br>${Math.round(speed)}mph</p>`;
  weatherType.innerHTML = `<p>Weather<br>${weather}</p>`;
  visible.innerHTML = ` <p><br>Visisbility:<br>${visibility}Km</p>`;
  feelTemp.innerHTML = `<p><br>Feels Like:<br>${Math.round(feelLike)}°C</p>`;
  sunriseDiv.innerHTML= `<p>Sunrise:<br> ${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>`;
  sunsetDiv.innerHTML = `<p>Sunset:<br> ${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>`;
 

 
  const tempElm = document.createElement("div");
 tempElm.innerHTML = `<p>${Math.round(temperature)}°c</p>`;
 tempElm.setAttribute("id", "tempElement");

 const cityElm = document.createElement("div");
 cityElm.innerHTML = `<p>${city}<br>${country}</p>`;
 cityElm.setAttribute("id","cityId");

 const iconElm = document.createElement("div");
 iconElm.innerHTML = `<img src=${iconUrl} alt="weatherIcon">`;
 iconElm.setAttribute("id","icon");

 
 const icon1 = document.createElement("img");
 icon1.src = "assets/pressure.png";
 icon1.style.height = "40px";
 icon1.style.width = "40px";
 pressure.prepend(icon1);

 const icon2 = document.createElement("img");
 icon2.src = "assets/sunrise.css.png";
 icon2.style.height = "40px";
 icon2.style.width = "40px";
sunriseDiv.prepend(icon2);

const icon3 = document.createElement("img");
icon3.src = "assets/sunset.css.png";
icon3.style.height = "40px";
icon3.style.width = "40px";
sunsetDiv.prepend(icon3);

const icon4 = document.createElement("img");
icon4.src = "assets/weather-type.png";
icon4.style.height = "40px";
icon4.style.width = "40px";
weatherType.prepend(icon4);


const icon5 = document.createElement("img");
icon5.src = "assets/humidity.png";
icon5.style.height ="40px";
icon5.style.width = "40px";
humidity1.prepend(icon5);

const icon6 = document.createElement("img");
icon6.src = "assets/clear-sky.png";
icon6.style.height = "40px";
icon6.style.width = "40px";
condition1.prepend(icon6);

const icon7 = document.createElement("img");
icon7.src = "assets/eye.png";
icon7.style.height = "40px";
icon7.style.width = "40px";
visible.prepend(icon7);

const icon8 = document.createElement("img");
icon8.src ="assets/storm.png";
icon8.style.height = "40px";
icon8.style.width = "40px";
windSpeed.prepend(icon8);

const icon9 = document.createElement("img");
icon9.src = "assets/thermometer.png";
icon9.style.height ="40px";
icon9.style.width = "40px";
feelTemp.prepend(icon9);

 cityName.appendChild(tempElm);
 tempElm.append(iconElm);
 cityName.appendChild(cityElm);
 
 updateBackground(data.weather[0].main);
}
 
function clearWeather() {
  cityName.innerHTML = "";
  pressure.innerHTML = "";
  condition1.innerHTML = "";
   humidity1.innerHTML = "";
   windSpeed.innerHTML = "";
  weatherType.innerHTML = "";
  visible.innerHTML = "";
   feelTemp.innerHTML = "";
   sunriseDiv.innerHTML = "";
   sunsetDiv.innerHTML = "";
}


function updateBackground(condition) {
  const body = document.querySelector(".app_div");


  body.classList.remove("sunny","cloudy","rainy","snowy", "storm","haze","default");
  switch(condition) {

  case "Clear":
  body.classList.add("sunny");
  break;

  case "Clouds":
  body.classList.add("cloudy");
  break;

  case "Rain":
  body.classList.add("rainy");
  break;

  case "Snow":
  body.classList.add("snowy");
  break;

  case "Thunderstorm":
  body.classList.add("storm");
  break;

  case "Haze":
   body.classList.add("haze");

   default:
  body.classList.add("default");
  }

}

