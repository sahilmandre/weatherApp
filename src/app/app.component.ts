import { Component, OnInit } from '@angular/core';
import { WeatherData } from './models/weather.model';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchTerm: any;
  constructor(private weatherService: WeatherService) {}

  cityName: string = 'Bhopal';
  weatherData?: WeatherData;
  public cel: any;

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  // ftoc(v: any) {
  //   let temp = (this.weatherData?.main.temp(v) - 32) * (5 / 9);
  //   this.cel = Math.round(temp * 10) / 10;
  // }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(data);
        const tempCelsius = data.main.temp - 32 * (5 / 9);
        this.weatherData.main.temp = tempCelsius;
      },
    });
  }
}
