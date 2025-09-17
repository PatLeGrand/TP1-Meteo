import { getWeatherDescription } from "../data/ForecastDaysWeatherForecast.js";

export function getSearchCityTemplate(city) {
  return `
    <header class="accordion-header wrap-words">
      <button class="accordion-button collapsed"
        data-bs-toggle="collapse"
        data-bs-target="[data-collapse-${city.id}]">
        <div class="d-flex flex-column">
          <h2 class="fs-5 fw-bold">
            <i class="fa-solid fa-location-dot me-2 text-primary"></i>${city.name}
          </h2>
          <h3 class="fs-6 country">
            ${city.country}
          </h3>
        </div>
      </button>
    </header>

    <div data-collapse-${city.id} class="accordion-collapse collapse"
      data-bs-parent="[data-accordion]">
      <div class="weather accordion-body text-start">
        <div class="text-muted">Cliquez pour voir la météo...</div>
      </div>
    </div>
  `;
}

export function getCurrentWeatherTemplate(currentWeather) {
  return `
    <div>
      <!-- Local date and time -->
      <div>
        <h4 class="text-white fs-6 fw-bold">Current local date and time</h4>
        <div>${currentWeather.time}</div>
      </div>

      <hr class="border-white">

      <!-- Current conditions -->
      <div>
        <h4 class="text-white fs-6 fw-bold">Current conditions</h4>
        <div class="d-flex justify-content-between gap-2 flex-wrap">

          <!-- Weather icon and temperature -->
          <div class="row flex-wrap">
            <div class="col">
              <img class="weather-icon" src="../public/images/cloudy.svg" alt="Weather">
            </div>
            <div class="col">
              <div>Condition</div>
              <div class="fs-1 fw-bold">${currentWeather.temperature}°</div>
            </div>
          </div>

          <!-- Details -->
          <div class="weather-grid">
            <div>
              <i class="fa-solid fa-temperature-three-quarters"></i>
              <span>${currentWeather.temperature}°</span>
            </div>
            <div>
              <i class="fa-solid fa-wind"></i>
              <span>${currentWeather.windspeed} km/h</span>
            </div>
            <div>
              <i class="fa-solid fa-compass"></i>
              <span>${currentWeather.winddirection}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


export function getForecastTemplate(forecasts) {
  let html = `
    <hr class="border-white">
    <div>
      <h4 class="text-white fs-6 fw-bold mb-3">Daily Forecast</h4>
      <div class="weather-details-grid mb-2">
  `;

  forecasts.forEach((day, index) => {
    const dateObj = new Date(day.date);


    let title;
    if (index === 0) {
      title = "Today";
    } else if (index === 1) {
      title = "Tomorrow";
    } else {
      title = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    }

    const smallDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });

    html += `
      <div class="rounded-2 p-3 shadow border border-1 border-dark">
        <div class="row flex-wrap">
          <div class="col mt-2">
            <h5 class="fs-6 fw-bold mb-0">${title}</h5>
            <div class="mb-3"><small>${smallDate}</small></div>
            <img class="weather-detail-icon" src="../public/images/rainy.svg" alt="Forecast">
            <div class="fw-bold mb-2">${getWeatherDescription(day.weathercode)}</div>
          </div>
          <div class="col mt-2">
            <div class="mb-3">
              <i class="fa-solid fa-temperature-three-quarters"></i>
              <span>Min: ${(day.temperature_2m_max+day.temperature_2m_min)/2}°</span>
            </div>
            <div class="mb-3">
              <i class="fa-solid fa-wind"></i>
              <span>${day.windspeed_10m_max} km/h</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  return html;
}

