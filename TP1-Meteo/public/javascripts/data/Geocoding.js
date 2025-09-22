import { getCache, setCache } from "../services/cache.js";

const apiUrl = "https://geocoding-api.open-meteo.com/v1/search?name=Sorel&count=10&language=fr&format=json";
const endpointDocumentation = "https://open-meteo.com/en/docs/geocoding-api#name=Sorel&language=fr";

export async function searchCities(query) {
  const key = `geocoding-${query.toLowerCase()}`;
  const cached = getCache(key);
  if (cached) return cached;

  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=fr&format=json`);
  const data = await res.json();
  if (!data.results) return [];

  const cities = data.results.map(city => ({
    id: city.id,
    name: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude
  }));

  setCache(key, cities, 5 * 60 * 1000); 
  return cities;
}