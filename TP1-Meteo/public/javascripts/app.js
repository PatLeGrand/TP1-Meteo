import { searchCities } from './data/Geocoding.js'
import { getForecast } from './data/ForecastDaysWeatherForecast.js'

getForecast(46.04178, -73.11358, 8).then(forecast => {
  console.log(forecast);
});
