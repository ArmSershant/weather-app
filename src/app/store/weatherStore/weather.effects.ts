import { Actions, createEffect, ofType } from '@ngrx/effects';
import { weatherService } from 'src/app/weather-widget/services/weather.service';
import {
  getWeather,
  getWeatherSuccess,
  addCityToDb,
  addCityToDbSuccess,
  getCities,
  loadCitiesSucces,
  deleteCity,
  deleteCitySuccess,
  swapCityIds,
  swapCitiesSuccess,
  swapCitiesFailure,
} from './weather.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { City } from 'src/app/weather-widget/models/city.model';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: weatherService
  ) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCities),
      switchMap(() =>
        this.weatherService.getCities().pipe(
          map((cities: City[]) => loadCitiesSucces({ cities })),
          catchError((error: any) => of(error))
        )
      )
    )
  );

  getWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getWeather),
      mergeMap((action: any) =>
        this.weatherService.getWeather(action.cityName).pipe(
          map((response: any) => getWeatherSuccess(response)),
          catchError((error: any) => of(error))
        )
      )
    )
  );

  addCityToDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCityToDb),
      mergeMap((action: any) =>
        this.weatherService.addCityToDb(action.city).pipe(
          map((response: any) =>
            addCityToDbSuccess({ cityName: response as string })
          ),
          catchError((error: any) => of(error))
        )
      ),
      map(() => getCities())
    )
  );

  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCity),
      switchMap((action) =>
        this.weatherService.deleteCity(action.id).pipe(
          map((city: any) => deleteCitySuccess({ city })),
          catchError((error) => of({ error }))
        )
      ),
      map(() => getCities())
    )
  );

  swapCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(swapCityIds),
      switchMap((action) =>
        this.weatherService
          .swapCities(action.firstCityId, action.secondCityId)
          .pipe(
            map((city: any) => swapCitiesSuccess({ city })),
            catchError((error: string) => of(swapCitiesFailure({ error })))
          )
      ),
      map(() => getCities())
    )
  );
}
