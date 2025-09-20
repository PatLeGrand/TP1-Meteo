export function getLoader(message) {
  return `
    <div class="alert alert-info d-flex align-items-center justify-content-between gap-2 text-start">
      <span>${message}</span>
      <img alt="Loader" class="loader" src="./public/images/loader.gif">
    </div>
  `;
}

export function textDanger(message) {
  return `
    <div class="text-danger">${message}</div>
  `
}