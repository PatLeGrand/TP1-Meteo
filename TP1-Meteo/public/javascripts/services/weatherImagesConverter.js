export function getWeatherIcon(code) {
  if ([0].includes(code)) return "./public/images/day.svg";
  if ([1, 2, 3].includes(code)) return "./public/images/cloudy.svg";
  if ([45, 48, ].includes(code)) return "./public/images/fog.png";
  if ([51, 53, 55].includes(code)) return "./public/images/rainy.svg";
  if ([56, 57].includes(code)) return "./public/images/rainy.svg";
  if ([61, 63, 65].includes(code)) return "./public/images/rainy.svg";
  if ([67, 66, 80, 81].includes(code)) return "./public/images/rainy.svg";
  if ([71, 73, 75].includes(code)) return "./public/images/snowy.svg";
  if ([95].includes(code)) return "./public/images/rainy.svg";
  if ([96, 99].includes(code)) return "./public/images/thunder.svg";
}
