import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  WeatherData:any;
  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Kiev&appid=d565aa78c7ea60404d8baa85fea73026')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
}

  setWeatherData(data) {
      this.WeatherData = data;
      let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
      this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
      this.WeatherData.today = new Date();
      this.WeatherData.isDay = (this.WeatherData.today.getTime() < sunsetTime.getTime());
      this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
      this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
      this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
  }

}