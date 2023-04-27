import { createSelector } from '@ngrx/store';
import { IState } from '../state/state';
import { WeatherState } from '../state/weatherState';

export const selectWeatherState = (state: IState) => state.weathers;
export const selectWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => {
    return state.weathers;
  }
);

export const selectCitiesState = (state: IState) => state.cities;
export const selectCities = createSelector(
  selectCitiesState,
  (state: WeatherState) => {
    return state.cities;
  }
);
