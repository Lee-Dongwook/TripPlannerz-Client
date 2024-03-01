import type { AxiosResponse } from 'axios';
import { KoreanWeatherDescriptionList } from '@/lib/info/KoreanWeatherDescriptionList';

export const convertWeatherInfo = (response: AxiosResponse<any, any>) => {
  const convertedCityName = response.data.name.split('-')[0];
  const convertedWeatherDescription = KoreanWeatherDescriptionList[response.data.weather[0].id];
  const convertedDigitTemp = Math.round(response.data.main.temp);
  const weatherIcon = response.data.weather[0].icon;
  const convertedWeatherIconAddress = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return {
    convertedCityName,
    convertedWeatherDescription,
    convertedDigitTemp,
    convertedWeatherIconAddress,
  };
};
