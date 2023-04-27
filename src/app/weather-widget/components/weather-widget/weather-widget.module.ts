import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherWidgetRoutingModule } from './weather-widget-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, WeatherWidgetRoutingModule],
})
export class WeatherWidgetModule {}
