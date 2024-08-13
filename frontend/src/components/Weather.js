import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './Weather.css';

export default function Weather() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const app_id = '27b6db0acfb370e208fdaf1467da3129';

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      fetchWeatherData(inputValue);
    } else {
      alert('Please enter the city!');
    }
  };

  const fetchWeatherData = async (input) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${app_id}&units=metric&lang=vi`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setWeatherInfo(null);
        throw new Error('Data not found!');
      }
      const data = await res.json();
      setWeatherInfo(data);
      console.log(`Weather data of ${data.name}: `, data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIconUrl = (url) => {
    return `https://openweathermap.org/img/wn/${url}@2x.png`;
  };

  return (
    <div className='weather-container'>
      <div className='search-div'>
        <label htmlFor='search-input'>Enter your city: </label>
        <input
          id='search-input'
          type='text'
          placeholder='Search your city'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
          required
        />
        <Button variant='info' id='search-btn' onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Conditionally render the weather data */}
      {weatherInfo ? (
        <div className='display-container'>
          <div className='info-div'>
            <div className='info-left'>
              <h1 id='city-name'>{weatherInfo.name}</h1>
              <img 
                id='weather-icon' 
                alt={`${weatherInfo.name}-${weatherInfo.weather[0].description}`}
                src={getWeatherIconUrl(weatherInfo.weather[0].icon)}
              />
              <p id='temp'>Temp: {weatherInfo.main.temp}°C</p>
            </div>

            <div className='info-right'>
              <p id='description'>Description: {weatherInfo.weather[0].description}</p>
              <p id='feels_like'>Feels like: {weatherInfo.main.feels_like}°C</p>
              <p id='temp_min'>Temp min: {weatherInfo.main.temp_min}°C</p>
              <p id='temp_max'>Temp max: {weatherInfo.main.temp_max}°C</p>
              <p id='pressure'>Pressure: {weatherInfo.main.pressure} hPa</p>
              <p id='humidity'>Humidity: {weatherInfo.main.humidity}%</p>
              <p id='speed'>Speed: {weatherInfo.wind.speed} m/s</p>
              <p id='sunrise'>Sunrise: {new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p id='sunset'>Sunset: {new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
