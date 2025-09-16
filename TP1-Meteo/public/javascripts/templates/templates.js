export function getSearchCityTemplate(city) {
    return `
                <header class="accordion-header">
                    <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-${city.id}"
                    >
                    <i class="fa-solid fa-location-dot me-2 text-primary"></i>
                    ${city.name}, ${city.country}
                    </button>
                </header>

                <div
                    id="collapse-${city.id}"
                    class="accordion-collapse collapse"
                    data-bs-parent="[data-accordion]"
                >
                    <div class="accordion-body">Cliquez pour voir la météo...</div>
                </div>          

    `
};