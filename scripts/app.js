const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const cityDetails = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDets, weather } = data;

  // update details

  cityDetails.innerHTML = `

    <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>


          `;

  icon.src = `img/icons/${weather.WeatherIcon}.svg`;

  let timeSrc = null;

  if (weather.IsDayTime) {
    time.src = "img/day.svg";
  } else {
    time.src = "img/night.svg";
  }

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   Get the city name
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //   update the UI

  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
