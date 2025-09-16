import { searchCities } from './data/Geocoding.js'
//import {getForecast } from './data/ForecastDaysWeatherForecast.js'
searchCities("Sorel").then(cities => {
  console.log(cities);
});

