import { City } from 'src/app/weather-widget/models/city.model';
import { Weather } from 'src/app/weather-widget/models/weather.model';

export interface WeatherState {
  weathers: Weather[];
  cities: City[];
}
