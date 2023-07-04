import weatherService from '../services/Countries';
import { useState, useEffect } from 'react';

const Weather = ({ lat, lon }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const unit = 'metric';
  const [weathers, setWeathers] = useState([]);
  const [weatherLink, setWeatherLink] = useState('');

  useEffect(() => {
    weatherService
      .getWeather(lat, lon, unit, api_key)
      .then(response => {
        setWeathers(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [lat, lon, unit, api_key]);

  useEffect(() => {
    if (weathers.length > 0) {
      setWeatherLink(
        `https://openweathermap.org/img/wn/${weathers.weather[0].icon}@2x.png`
      );
    }
  }, [weathers]);

  console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${api_key}`);
  console.log(lat);
  console.log(lon);
  console.log(weathers);
  console.log(weatherLink);
  console.log(weathers.length > 0 ? weathers.weather[0].icon : '');
  console.log(weathers.length > 0 ? weathers.main.temp : '');
  console.log(weathers.length > 0 ? weathers.wind.speed : '');

  return (
    <div>
      {weathers.length > 0 ? (
        <div>
          <div>temperature {weathers.main.temp} celsius</div>
          <div>
            <img src={weatherLink} alt="Image" />
          </div>
          <div>wind {weathers.wind.speed} m/s</div>
        </div>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default Weather;