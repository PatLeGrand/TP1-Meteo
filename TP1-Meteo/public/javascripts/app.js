
import { searchCities } from './data/Geocoding.js';
import { getForecast } from './data/ForecastDaysWeatherForecast.js';
import { getCurrentWeatherForecast } from './data/CurrentWeatherForecast.js';
import { getSearchCityTemplate, getCurrentWeatherTemplate, getForecastTemplate } from './templates/templates.js';

const userSearch = document.querySelector("#search-bar-input");
const accordion = document.querySelector("[data-accordion]");

userSearch.addEventListener("input", async (event) => {
    const query = event.target.value;

    if (!query) {
        accordion.innerHTML = "";
        return;
    }

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

            const currentWeather = await getCurrentWeatherForecast(city.latitude, city.longitude);
            collapse.innerHTML = getCurrentWeatherTemplate(currentWeather);

            const forecasts = await getForecast(city.latitude, city.longitude, 8);
            collapse.innerHTML += getForecastTemplate(forecasts);
        });
    }

});
