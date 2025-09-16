
import { searchCities } from './data/Geocoding.js';
// import { getForecast } from './data/ForecastDaysWeatherForecast.js';
import { getCurrentWeatherForecast } from './data/CurrentWeatherForecast.js';
import { getSearchCityTemplate, getCurrentWeatherTemplate } from './templates/templates.js';

const userSearch = document.querySelector("#search-bar-input");
const accordion = document.querySelector("[data-accordion]");

userSearch.addEventListener("input", async (event) => {
  const query = event.target.value;

  if (!query) {
    accordion.innerHTML = "";
    return;
  }

  const cities = await searchCities(query)

    accordion.innerHTML = "";
    for (const city of cities) {
        const item = document.createElement("div");
        item.classList.add("accordion-item");
        item.innerHTML = getSearchCityTemplate(city);
        accordion.append(item);
        
        const button = item.querySelector("button");
        button.addEventListener("click", () => {
        const collapse = item.querySelector(".accordion-body");
        collapse.innerHTML = "<div class='text-muted'>Loading...</div>";

        getCurrentWeatherForecast(city.latitude, city.longitude)
            .then(currentWeather => {
            collapse.innerHTML = getCurrentWeatherTemplate(currentWeather);
            })
            .catch(() => {
            collapse.innerHTML = "<div class='text-danger'>Unable to fetch weather data.</div>";
            });
        });
    }

});
