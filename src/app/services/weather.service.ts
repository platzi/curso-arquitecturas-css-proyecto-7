import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherByDay(city: string) {
    return this.http.get<any>(
      `${environment.url_api}?q=${city}&appid=${environment.api_key}`
      // 'http://api.openweathermap.org/data/2.5/weather?q=Loja&appid=85433a3d65e7d960e88761e1da084cf0'
    );
  }
}
