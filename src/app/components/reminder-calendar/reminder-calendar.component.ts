import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from 'src/app/services/weather.service';

export interface DialogData {
  idArray: null;
  idDate: null;
  dayDate: null;
  textReminder: null;
  city: null;
  hourReminder: null;
  colorReminder: null;
}

@Component({
  selector: 'app-reminder-calendar',
  templateUrl: './reminder-calendar.component.html',
  styleUrls: ['./reminder-calendar.component.scss'],
})
export class ReminderCalendarComponent {
  arrayColors = [
    { id: 'Pink', value: '#FFC0CB' },
    { id: 'Purple', value: '#DA70D6' },
    { id: 'Red', value: '#FF0000' },
    { id: 'Orange', value: '#FF8C00' },
    { id: 'Yellow', value: '#FFFF00' },
    { id: 'Green', value: '#32CD32' },
    { id: 'Cyan', value: '#00FFFF' },
    { id: 'Blue', value: '#4169E1' },
    { id: 'Brown', value: '#CD853F' },
    { id: 'Black', value: '#000000' },
    { id: 'Grey', value: '#D3D3D3' },
  ];

  weatherCity: {};
  errorQuery: '';

  constructor(
    public dialogRef: MatDialogRef<ReminderCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private weatherService: WeatherService
  ) {
    console.log('maped data>>', data);
  }

  queryWeatherData(cityWeather) {
    if (cityWeather || this.data.city) {
      let cityQuery = this.data.city ? this.data.city : cityWeather;
      this.weatherService.getWeatherByDay(cityQuery).subscribe(
        (data) => {
          console.log('query weather', data);
          this.weatherCity = { main: data.main, weather: data.weather };
          console.log(this.weatherCity);
        },
        (err) => {
          console.log('query error ', err);
          console.log('query error ', err.error.message);
          this.errorQuery = err.error.message;
        }
      );
    } else {
      this.weatherCity = null;
    }
  }

  alert(message) {
    console.log(message);
  }
}
