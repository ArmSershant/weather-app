import { createAction, props } from '@ngrx/store';
import { City } from 'src/app/weather-widget/models/city.model';
import { Weather } from 'src/app/weather-widget/models/weather.model';

export const getCities = createAction('[Weather Componnet] Get All Cities');

export const loadCitiesSucces = createAction(
  '[Weather Component] Load Cities Succes',
  props<{ cities: City[] }>()
);

export const getWeather = createAction(
  '[Weather Component] Add City',
  props<{ cityName: string }>()
);

export const getWeatherSuccess = createAction(
  '[Weather Component] Set Weater Data',
  (data: Weather) => ({ data })
);

export const addCityToDb = createAction(
  '[App Component] Add City To Database',
  props<{ city: City }>()
);

export const addCityToDbSuccess = createAction(
  '[App Component] Add City To Database Success',
  props<{ cityName: string }>()
);

export const deleteCity = createAction(
  '[App Component] Delete City',
  props<{ id: number }>()
);

export const deleteCitySuccess = createAction(
  '[App Component] Delete City Success',
  props<{ city: City }>()
);

export const swapCityIds = createAction(
  '[App Component] Swap City',
  props<{ firstCityId: number; secondCityId: number }>()
);

export const swapCitiesSuccess = createAction(
  '[App Component] Swap City Success',
  props<{ city: City }>()
);

export const swapCitiesFailure = createAction(
  '[App Component] Swap City Failure',
  props<{ error: string }>()
);
