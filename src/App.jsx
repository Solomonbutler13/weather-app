import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: null,
    clouds: null,
    windSpeed: null,
  });

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const cities = [
    { name: 'New York', country: 'US', lat: 40.7128, lon: 74.0060 },
    // Add other cities here
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
      );
      const data = await response.json();
      console.log(data);
      setWeatherInfo({
        temperature: data.main.temp,
        clouds: data.clouds.all,
        windSpeed: data.wind.speed,
      });
    };
    fetchWeather();
  }, [selectedCity]);

  function WeatherCard({ weatherInfo }) {
    return (
      <div className="weather-card">
        <h2>Current Weather</h2>
        <p>Temperature: {weatherInfo.temperature}°F</p>
        <p>Cloud Coverage: {weatherInfo.clouds}%</p>
        <p>Wind Speed: {weatherInfo.windSpeed} mph</p>
      </div>
    );
  }

  return (
    <>
      <div className="app">
        <div className="search">
          <select onChange={handleCityChange}>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <WeatherCard weatherInfo={weatherInfo} />
    </>
  );
}
