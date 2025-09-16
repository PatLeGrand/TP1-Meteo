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
