import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { WeatherWidgetComponent } from './weather-widget/components/weather-widget/weather-widget.component';
import { WeatherEffects } from './store/weatherStore/weather.effects';
import { weatherReducer } from './store/weatherStore/weather.reducers';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, WeatherWidgetComponent],
  imports: [
    DragDropModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ cities: weatherReducer,weathers:weatherReducer }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
