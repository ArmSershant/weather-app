import { Component } from '@angular/core';
import { selectCities } from './store/weatherStore/weather.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { IState } from './store/state/state';
import { City } from './weather-widget/models/city.model';
import {
  addCityToDb,
  deleteCity,
  getCities,
  swapCityIds,
} from './store/weatherStore/weather.actions';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<IState>) {
    this.cities$.subscribe((cities) => (this.cities = cities));
  }
  cities!: City[];
  cities$: Observable<City[]> = this.store.select(selectCities);
  showAllCities: Boolean = false;
  error: string = '';

  ngOnInit() {
    this.store.dispatch(getCities());
  }

  onDeleteCity(id: number) {
    this.store.dispatch(deleteCity({ id }));
    this.showAllCities = false;
  }

  onAddCity(formData: any) {
    const cityName = formData.cityName.trim();
    if (cityName != '') {
      const city = new City(0, cityName);
      this.store.dispatch(addCityToDb({ city }));
    }
  }

  onDrop(event: CdkDragDrop<City[]>) {
    const firstCityId = event.previousContainer.data[event.previousIndex].id;
    const secondCityId = event.container.data[event.currentIndex].id;
    this.store.dispatch(swapCityIds({ firstCityId, secondCityId }));
  }
}
