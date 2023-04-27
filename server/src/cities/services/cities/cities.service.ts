/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/typeorm/entities/City';
import { AddCityParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  // Get Weather By City
  async getWeatherByCities() {
    const cities = await this.cityRepository.find();
    return cities;
  }

  // Add City To Db
  async addCityToDb(city: AddCityParams) {
    const existsCity = await this.cityRepository.findOneBy({ name: city.name });
    if (existsCity)
      throw new HttpException(
        `${city.name} exist in your weather list cannot add`,
        HttpStatus.BAD_REQUEST,
      );
    const newCity = this.cityRepository.create({ ...city });
    return this.cityRepository.save(newCity);
  }

  // Delete City
  async deleteCity(id: number) {
    const city = await this.cityRepository.findOneBy({ id: id });
    if (!city)
      throw new HttpException(
        `City ${id} does not exist cannot delete`,
        HttpStatus.BAD_REQUEST,
      );
    return this.cityRepository.delete({ id: id });
  }

  // Swap Cities
  async swapCities(firstId: number, secondId: number) {
    let firstCity = await this.cityRepository.findOneBy({ id: firstId });
    let secondCity = await this.cityRepository.findOneBy({ id: secondId });
    const tempId = firstCity.id;
    firstCity.id = secondCity.id;
    secondCity.id = tempId;
    return await this.cityRepository.save([firstCity, secondCity]);
  }
}
