import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface DialogData {
  idArray: any;
  idDate: string;
  dayDate: Date;
  textReminder: string;
  city: string;
  hourReminder: string;
  colorReminder: string;
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
    { id: 'Yellow', value: '#F7EA00' },
    { id: 'Green', value: '#32CD32' },
    { id: 'Cyan', value: '#00FFFF' },
    { id: 'Blue', value: '#4169E1' },
    { id: 'Brown', value: '#CD853F' },
    { id: 'Black', value: '#000000' },
    { id: 'Grey', value: '#D3D3D3' },
  ];

  weatherCity: {};
  errorQuery: '';
  date = new FormControl(this.data.dayDate);

  constructor(
    public dialogRef: MatDialogRef<ReminderCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private weatherService: WeatherService
  ) {
    console.log('maped data>>', data);
    this.queryWeatherData(data.city);
  }

  queryWeatherData(cityWeather) {
    console.log('cityWeather', cityWeather);
    if (cityWeather || this.data.city) {
      let cityQuery = this.data.city ? this.data.city : cityWeather;
      this.weatherService.getWeatherByDay(cityQuery).subscribe(
        (data) => {
          console.log('query weather', data);
          this.weatherCity = { main: data.main, weather: data.weather };
          console.log(this.weatherCity);
        },
        (err) => {
          this.weatherCity = null;
          console.log('query error ', err);
          console.log('query error ', err.error.message);
          this.errorQuery = err.error.message;
        }
      );
    } else {
      this.weatherCity = null;
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log('data.daydate', this.data.dayDate, event.value);
    this.data.dayDate = event.value;
  }

  dateModified(dateModified) {
    console.log('data.daydate', this.data.dayDate, dateModified);
    this.data.dayDate = dateModified;
  }
}
