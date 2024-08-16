  import React, { useState } from 'react';
  import { Alert, Button } from 'react-bootstrap';
  import './Weather.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import {faLocationDot, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
  import axios from 'axios';

  export default function Weather() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const DEFAULT_VALUE = "--";
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
      const url = `http://localhost:3001/api/weather/${input}`;
      try {
        const res = await axios.get(url);
        setWeatherInfo(res.data);
        console.log(`Weather data of ${res.data.name}: `, res.data);
      } catch (error) {
        setWeatherInfo(null);
        alert("City not found!");
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
          <FontAwesomeIcon icon={faLocationDot} bounce />
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
            <FontAwesomeIcon icon={faMagnifyingGlass} beat />
          </Button>
        </div>

        {/* Conditionally render the weather data */}
        {weatherInfo ? (
          <div className='display-container'>
            <div className='info-left'>
              <h1 id='city-name'>{weatherInfo.name || DEFAULT_VALUE}</h1>
              <img 
                id='weather-icon' 
                alt={`${weatherInfo.name}-${weatherInfo.weather[0].description}`}
                src={getWeatherIconUrl(weatherInfo.weather[0].icon)}
              />
              <p id='description'>{weatherInfo.weather[0].description || DEFAULT_VALUE}</p>
              <p id='temp'>{weatherInfo.main.temp}°C</p>            
              <p id='feels_like'>Feels like: {weatherInfo.main.feels_like || DEFAULT_VALUE}°C</p>
              <p id='temp_min'>Temp min: {weatherInfo.main.temp_min || DEFAULT_VALUE}°C</p>
              <p id='temp_max'>Temp max: {weatherInfo.main.temp_max || DEFAULT_VALUE}°C</p>
            </div>
            <div className='info-right'>
              <p id='humidity'>Humidity: {weatherInfo.main.humidity || DEFAULT_VALUE}%</p>
              <p id='pressure'>Pressure: {weatherInfo.main.pressure || DEFAULT_VALUE} hPa</p>  
              <p id='sea_level'>Sea level: {weatherInfo.main.sea_level || DEFAULT_VALUE}</p>            
              <p id='speed'>Wind speed: {weatherInfo.wind.speed || DEFAULT_VALUE} m/s</p>
              <p id='sunrise'>Sunrise: {new Date(weatherInfo.sys.sunrise * 1000 || DEFAULT_VALUE).toLocaleTimeString()}</p>
              <p id='sunset'>Sunset: {new Date(weatherInfo.sys.sunset * 1000 || DEFAULT_VALUE).toLocaleTimeString()}</p>
            </div>         
          </div>
        ) : (
          <Alert key='info' variant='info'>
            Find your weather infomation of your city!
          </Alert>
        )}
      </div>
    );
  }
