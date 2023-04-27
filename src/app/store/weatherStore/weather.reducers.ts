import { createReducer, on } from '@ngrx/store';
import { WeatherState } from './../state/weatherState';
import { getWeatherSuccess, loadCitiesSucces } from './weather.actions';

export const initialState: WeatherState = {
  weathers: [],
  cities: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(loadCitiesSucces, (state, { cities }) => ({ ...state, cities: cities })),
  on(getWeatherSuccess, (state, { data }) => ({
    ...state,
    weathers: [...state.weathers, data],
  }))
);
