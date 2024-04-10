import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Timer from '../timer/timer';
import { getWeatherInfo } from '@/services/getWeatherInfo';
import { convertWeatherInfo } from '@/application/convertWeatherInfo';

const Weather = () => {
  const [cityName, setCityName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>('');

  const getWeather = async (lat, lon) => {
    try {
      const response = await getWeatherInfo(lat, lon);
      if (response) {
        const {
          convertedCityName,
          convertedWeatherDescription,
          convertedDigitTemp,
          convertedWeatherIconAddress,
        } = convertWeatherInfo(response);

        setCityName(convertedCityName);
        setDescription(convertedWeatherDescription);
        setTemp(convertedDigitTemp);
        setIcon(convertedWeatherIconAddress);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      getWeather(lat, lng);
    });
  }, []);

  return cityName !== '' ? (
    <div className='border rounded-lg bg-blue-100 mt-3 w-max h-max p-5'>
      <Timer />
      <div className='flex items-center justify-center mb-4'>
        <span className='text-lg font-bold'>{cityName}</span>
      </div>
      <img src={icon} alt='weather icon' className='w-12 h-12 mx-auto mb-4' />
      <div className='text-xl font-bold text-center mb-4'>{temp} °C</div>
      <div className='text-l font-bold text-center mb-4'>{description}</div>
    </div>
  ) : (
    <div className='mt-3 w-max h-max'>
      <Skeleton width={236} height={340} />
    </div>
  );
};

export default Weather;
