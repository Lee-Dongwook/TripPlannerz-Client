interface CoordInfo {
  lat: number;
  lon: number;
}
interface DetailWeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface MainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
interface WindInfo {
  speed: number;
  deg: number;
  gust: number;
}
interface CloudInfo {
  all: number;
}
interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface WeatherInfo {
  coord: CoordInfo;
  weather: DetailWeatherInfo[];
  base: string;
  main: MainInfo;
  visibility: number;
  wind: WindInfo;
  clouds: CloudInfo;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
