import { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../timer/timer';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const weather = () => {
  const [cityName, setCityName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<string>('');

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const digitTemp = Math.round(response.data.main.temp);
      const weatherIcon = response.data.weather[0].icon;
      const weatherIconAddress = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      setCityName(response.data.name);
      setTemp(digitTemp);
      setIcon(weatherIconAddress);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      getWeather(lat, lng);
    });
  }, []);

  return (
    <div className='weather-card border rounded-lg bg-gray-100 mt-3 h-1/4 p-4'>
      <Timer />
      <div className='flex items-center justify-between mb-4'>
        <span className='text-lg font-bold'>{cityName}</span>
      </div>
      <img src={icon} alt='weather icon' className='w-12 h-12 mx-auto mb-4' />
      <div className='text-xl font-bold text-center mb-4'>{temp}°C</div>
    </div>
  );
};

export default weather;
