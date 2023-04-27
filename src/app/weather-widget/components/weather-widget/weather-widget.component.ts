import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IState } from './../../../store/state/state';
import { Store } from '@ngrx/store';
import { selectWeather } from 'src/app/store/weatherStore/weather.selectors';
import { getWeather } from 'src/app/store/weatherStore/weather.actions';
import { City } from '../../models/city.model';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent implements OnInit {
  weathers$: Observable<Weather[]> = this.store.select(selectWeather);
  @Input() city!: City;
  @Input() index!: number;
  cityName!: string;
  showDelete: Boolean = false;
  constructor(private store: Store<IState>) {}

  ngOnInit(): void {
    this.store.dispatch(getWeather({ cityName: this.city.name }));
  }

  onDeleteCity() {
    
  }

  calculateDewPoint(temperature: number, humidity: number) {
    const a = 17.27;
    const b = 237.7;
    const gamma =
      (a * temperature) / (b + temperature) + Math.log(humidity / 100);
    const dewPoint = (b * gamma) / (a - gamma);
    return dewPoint.toFixed(1);
  }
}
