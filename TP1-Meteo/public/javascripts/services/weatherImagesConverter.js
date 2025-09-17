export function getWeatherIcon(code) {
  if ([0].includes(code)) return "../public/images/day.svg";
  if ([1, 2].includes(code)) return "../public/images/cloudy-day.svg";
  if ([3].includes(code)) return "../public/images/cloudy.svg";
  if ([45, 48].includes(code)) return "../public/images/fog.svg";
  if ([51, 53, 55].includes(code)) return "../public/images/rainy-1.svg";
  if ([61, 63, 65].includes(code)) return "../public/images/rainy-2.svg";
  if ([80, 81, 82].includes(code)) return "../public/images/rainy.svg";
  if ([95, 96, 99].includes(code)) return "../public/images/thunder.svg";
  return "../public/images/unknown.svg";
}
