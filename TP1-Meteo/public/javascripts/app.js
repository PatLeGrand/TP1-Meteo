import { searchCities } from './data/Geocoding.js'
import { getForecast } from './data/ForecastDaysWeatherForecast.js'
import { getSearchCityTemplate } from './templates/templates.js';

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
                
            item.innerHTML = getSearchCityTemplate(city);

            accordion.append(item);
            
            const button = item.querySelector("button");
            button.addEventListener("click", () =>{
                getForecast(city.latitude, city.longitude, 8).then(() => {
                    const collapse = item.querySelector(".accordion-body")
                    collapse.innerHTML="Merci"
                })
            })
        }

    }
        
    )})

