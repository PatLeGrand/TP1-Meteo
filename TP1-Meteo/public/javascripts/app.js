import { searchCities } from './data/Geocoding.js';
import { getCurrentWeatherForecast } from './data/CurrentWeatherForecast.js';
import { getForecast } from './data/ForecastDaysWeatherForecast.js';
import { getSearchCityTemplate, getCurrentWeatherTemplate, getForecastTemplate } from './templates/templates.js';
import { debounce } from './services/debounce.js';
import { getLoader, textDanger } from './services/intercationMessage.js';

const userSearch = document.querySelector("#search-bar-input");
const accordion = document.querySelector("[data-accordion]");
const clearButton = document.querySelector(".x");

clearButton.addEventListener("click", () => {
  userSearch.value = "";
  accordion.innerHTML = "";
  userSearch.focus();
});

async function makeSearch(event) {
  const query = event.target.value.trim();

  if (!query) {
    accordion.innerHTML = "";
    return;
  }

  accordion.innerHTML = getLoader("Searching cities...");

  try {
    const cities = await searchCities(query);

    if (!cities || cities.length === 0) {
      accordion.innerHTML = textDanger(`⚠️ No city found for "${query}"`);
      return;
    }

    accordion.innerHTML = "";
    for (const city of cities) {
      const item = document.createElement("div");
      item.classList.add("accordion-item");
      item.innerHTML = getSearchCityTemplate(city);
      accordion.append(item);

      const button = item.querySelector("button");
      button.addEventListener("click", async () => {
        const collapse = item.querySelector(".accordion-body");
        collapse.innerHTML = getLoader("Loading weather...");

        try {
          const currentWeather = await getCurrentWeatherForecast(city.latitude, city.longitude);
          const forecasts = await getForecast(city.latitude, city.longitude, 8);

          collapse.innerHTML = `
            ${getCurrentWeatherTemplate(currentWeather)}
            ${getForecastTemplate(forecasts)}
          `;
        } catch (error) {
          console.error(error);
          collapse.innerHTML = textDanger("⚠️ Unable to load weather data ");
        }
      });
    }
  } catch (error) {
    console.error(error);
    accordion.innerHTML = textDanger("⚠️ No connection. Please check your Internet and try again.");
  }
}

userSearch.addEventListener("input", debounce(makeSearch, 300));
