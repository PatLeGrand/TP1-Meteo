import { searchCities } from './data/Geocoding.js';
import { getCurrentWeatherForecast } from './data/CurrentWeatherForecast.js';
import { getForecast } from './data/ForecastDaysWeatherForecast.js';
import { getSearchCityTemplate, getCurrentWeatherTemplate, getForecastTemplate } from './templates/templates.js';
import { debounce } from './services/debounce.js';

const userSearch = document.querySelector("#search-bar-input");
const accordion = document.querySelector("[data-accordion]");

async function makeSearch(event) {
  const query = event.target.value;

  if (!query) {
    accordion.innerHTML = "";
    return;
  }

  try {
    const cities = await searchCities(query);

    accordion.innerHTML = "";
    for (const city of cities) {
      const item = document.createElement("div");
      item.classList.add("accordion-item");
      item.innerHTML = getSearchCityTemplate(city);
      accordion.append(item);

      const button = item.querySelector("button");
      button.addEventListener("click", async () => {
        const collapse = item.querySelector(".accordion-body");
        collapse.innerHTML = "<div class='text-muted'>Loading...</div>";

        try {
          const currentWeather = await getCurrentWeatherForecast(city.latitude, city.longitude);
          const forecasts = await getForecast(city.latitude, city.longitude, 8);

          collapse.innerHTML = `
            ${getCurrentWeatherTemplate(currentWeather)}
            ${getForecastTemplate(forecasts)}
          `;
        } catch (error) {
          console.error(error);
          collapse.innerHTML = `<div class="text-danger">⚠️ Unable to load weather data (offline or API issue).</div>`;
        }
      });
    }
  } catch (error) {
    console.error(error);
    accordion.innerHTML = `<div class="alert alert-warning">⚠️ No connection. Please check your Internet and try again.</div>`;
  }
}

userSearch.addEventListener("input", debounce(makeSearch, 300));
