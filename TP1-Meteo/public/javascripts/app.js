import { searchCities } from './data/Geocoding.js'
import { getForecast } from './data/ForecastDaysWeatherForecast.js'

const userSearch = document.querySelector("#search-bar-input");
const accordion = document.querySelector("[data-accordion]")

userSearch.addEventListener("input", (event) => {
    const query = event.target.value;

    if (!query){
        accordion.innerHTML = "";
        return
    }

    searchCities(query).then(cities => {
        accordion.innerHTML = "";
        for (const city of cities){
            const item = document.createElement("div");
            item.classList.add("accordion-item");
                
            item.innerHTML = `
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button">
                    <i class="fa-solid fa-location-dot me-2 text-primary"></i>
                    ${city.name}, ${city.country}
                </button>
                </h2>
                <div class="accordion-collapse collapse">
                <div class="accordion-body">Cliquez pour voir la météo...</div>
                </div>
            `;

            accordion.append(item);            
        }

    }
        
    )})

