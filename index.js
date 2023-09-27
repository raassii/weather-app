const weatherApiKey = "cc8de40194de3752bee2c208d26cccc0";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".button");
const weatherIcon = document.querySelector(".weather-icon");

let interval = null;

async function checkWeather(city) {
  const weatherResponse = await fetch(
    weatherApiUrl + city + `&appid=${weatherApiKey}&units=metric`
  );

  if (weatherResponse.status == 404) {
    document.querySelector(".error p").style.display = "block";
    document.querySelector(".weather-icon").style.display = "none";
    document.querySelector(".temp").style.display = "none";
    document.querySelector(".description").style.display = "none";
    document.querySelector(".humidity-percentage").style.display = "none";
    document.querySelector(".wind-speed").style.display = "none";
    document.querySelector(".humidity-text").innerHTML = "";
    document.querySelector(".wind-text").innerHTML = "";
    document.querySelector(".humidity img").style.display = "none";
    document.querySelector(".wind img").style.display = "none";
    document.querySelector(".slideshow").style.display = "none";
  } else {
    document.querySelector(".error p").style.display = "none";
    document.querySelector(".weather-icon").style.display = "block";
    document.querySelector(".temp").style.display = "block";
    document.querySelector(".description").style.display = "block";
    document.querySelector(".humidity-percentage").style.display = "block";
    document.querySelector(".wind-speed").style.display = "block";
    document.querySelector(".slideshow").style.display = "block";

    const weatherData = await weatherResponse.json();

    document.querySelector(".temp").innerHTML =
      Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".description").innerHTML =
      weatherData.weather[0].description;
    document.querySelector(".humidity-percentage").innerHTML =
      weatherData.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML =
      weatherData.wind.speed + " km/h";
    document.querySelector(".humidity img").style.display = "block";
    document.querySelector(".wind img").style.display = "block";
    document.querySelector(".humidity-text").innerHTML = "Humidity";
    document.querySelector(".wind-text").innerHTML = "Wind Speed";
    const slides = document.getElementsByClassName("city-img");
    for (let i = 0; i < slides.length; i++) {
      slides[i].src =
        "https://source.unsplash.com/random/1600x900/?" + city + "&" + i;
    }

    weatherIcon.src =
      "https://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      "@2x.png";

    let myIndex = 0;

    function carousel() {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > slides.length) {
        myIndex = 1;
      }
      slides[myIndex - 1].style.display = "block";
    }

    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(carousel, 3000);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
