import { getCache, setCache } from "../services/cache.js";
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=46.04178&longitude=-73.11358&current_weather=true";

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

const sampleData = {
	"latitude": 46.04474,
	"longitude": -73.10983,
	"generationtime_ms": 1.055002212524414,
	"utc_offset_seconds": -14400,
	"timezone": "America/Toronto",
	"timezone_abbreviation": "EDT",
	"elevation": 18.0,
	"current_weather": {
		"temperature": 15.4,
		"windspeed": 9.0,
		"winddirection": 53,
		"weathercode": 3,
		"is_day": 1,
		"time": "2023-08-25T12:00"
	}
}