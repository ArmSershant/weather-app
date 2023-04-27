import { Module } from '@nestjs/common';
import { CitiesService } from './services/cities/cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/typeorm/entities/City';
import { CitiesController } from './controllers/cities/cities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
