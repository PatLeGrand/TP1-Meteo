import { getCache, setCache } from "../services/cache.js";

export async function getCurrentWeatherForecast(latitude, longitude) {
  const key = `current-${latitude}-${longitude}`;
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const data = await res.json();

  const current = {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    winddirection: data.current_weather.winddirection,
    weathercode: data.current_weather.weathercode,
    is_day: data.current_weather.is_day,
    time: data.current_weather.time
  };

  setCache(key, current, 5 * 60 * 1000);
  return current;
}