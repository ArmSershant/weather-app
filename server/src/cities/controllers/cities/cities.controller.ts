import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { addCityDetails } from 'src/cities/details/addCity.detail';
import { swapCityDetails } from 'src/cities/details/swapCities.detail';
import { CitiesService } from 'src/cities/services/cities/cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  @Get()
  getWeatherByCities() {
    return this.citiesService.getWeatherByCities();
  }
  @Post('/add')
  addCityToDb(@Body() city: addCityDetails) {
    return this.citiesService.addCityToDb(city);
  }
  @Delete('/delete/:id')
  deleteCity(@Param('id', ParseIntPipe) id: number) {
    return this.citiesService.deleteCity(id);
  }

  @Put('/swap')
  swapCities(@Body() swap: swapCityDetails) {
    return this.citiesService.swapCities(swap.firstCityId, swap.secondCityId);
  }
}
