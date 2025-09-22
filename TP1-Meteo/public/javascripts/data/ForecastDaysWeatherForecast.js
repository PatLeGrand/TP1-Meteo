import { getCache, setCache } from "../services/cache.js";

export async function getForecast(latitude, longitude, days) {
  const key = `forecast-${latitude}-${longitude}-${days}`;
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,weathercode&timezone=auto`);
  const data = await res.json();

  const daily = data.daily;
  const forecasts = daily.time.map((date, i) => ({
    date,
    temperature_2m_max: daily.temperature_2m_max[i],
    temperature_2m_min: daily.temperature_2m_min[i],
    windspeed_10m_max: daily.windspeed_10m_max[i],
    weathercode: daily.weathercode[i]
  }));

  setCache(key, forecasts, 10 * 60 * 1000);
  return forecasts;
}

export function getWeatherDescription(code) {
  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light intensity",
    53: "Drizzle: Moderate intensity",
    55: "Drizzle: Dense intensity",
    61: "Rain: Slight intensity",
    63: "Rain: Moderate intensity",
    65: "Rain: Heavy intensity",
    80: "Rain showers: Slight intensity",
    81: "Rain showers: Moderate intensity",
    82: "Rain showers: Violent intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return codes[code] ?? "Unknown";
}