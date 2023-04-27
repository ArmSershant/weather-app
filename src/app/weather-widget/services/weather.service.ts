import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class weatherService {
  constructor(private http: HttpClient) {}

  private localUrl = 'http://localhost:3000/cities';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'fdf00b8438c880e8ed31528790d5cab3';

  getCities() {
    const url = `${this.localUrl}`;
    return this.http.get<City[]>(url);
  }

  getWeather(cityName: string) {
    const url = `${this.apiUrl}?q=${cityName}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  addCityToDb(city: City) {
    const url = `${this.localUrl}/add`;
    return this.http.post(url, city);
  }

  deleteCity(id: number) {
    const url = `${this.localUrl}/delete/${id}`;
    return this.http.delete(url);
  }
  swapCities(firstCityId: number, secondCityId: number) {
    console.log(firstCityId,secondCityId);
    const url = `${this.localUrl}/swap`;
    return this.http.put(url, { firstCityId, secondCityId });
  }
}
