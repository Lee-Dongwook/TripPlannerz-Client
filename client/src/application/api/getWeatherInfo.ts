import axios from 'axios';
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const getWeatherInfo = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
