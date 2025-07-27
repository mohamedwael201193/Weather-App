//var
let API_KEY = "fc2c37139f3444629af24804250105";
let columns = document.querySelectorAll(".card-weather");
let inputSearch = document.querySelector(".input-search");
let searchBtn = document.querySelector(".search");

//get data
async function getData(type = "london") {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${type}&days=3`
    );
    let result = await response.json();
    console.log(result);
    columns.forEach((col, i) => {
      let day = result.forecast.forecastday[i];
      col.querySelector(".head .text").innerHTML = new Date(
        day.date
      ).toLocaleDateString("en-US", { weekday: "long" });
      col.querySelector(".head .date").innerHTML = new Date(
        day.date
      ).toLocaleDateString("en-US", { day: "numeric", month: "short" });
      col.querySelector(".location").innerHTML = result.location.name;
      col.querySelector(".deg").innerHTML = day.day.avgtemp_c + "°C";
      col.querySelector(
        ".icon-weather"
      ).innerHTML = `<img src="https:${day.day.condition.icon}" alt="Weather Icon">`;
      col.querySelector(".icon-data").innerHTML = `
        <div><i class="fa-solid fa-droplet pe-2"></i><span>${day.day.avghumidity}%</span></div>
        <div><i class="fa-solid fa-wind pe-2"></i><span>${day.day.maxwind_kph} km/h</span></div>
        <div><i class="fa-solid fa-cloud-rain pe-2"></i><span>${day.day.daily_chance_of_rain}%</span></div>`;
    });
  } catch (error) {
    console.log("err");
  }
}
getData();

//input search
inputSearch.addEventListener("input", function (event) {
  let value = event.target.value.trim();
  if (value) {
    getData(value);
  }
});
