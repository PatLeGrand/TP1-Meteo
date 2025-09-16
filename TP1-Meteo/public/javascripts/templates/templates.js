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

