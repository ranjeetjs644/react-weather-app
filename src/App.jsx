import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import TimeLocation from "./components/TimeLocation";
import TempratureData from "./components/TempratureData";
import Forecast from "./components/Forecast";
import { getWeatherData, getForecastData } from "./services/WeatherServices";

function App() {
  const cities = [
    { id: 1, name: "Ahmedabad", country: "IN" },
    { id: 2, name: "Delhi", country: "IN" },
    { id: 3, name: "London", country: "UK" },
    { id: 4, name: "Washington", country: "US" },
    { id: 5, name: "Lucknow", country: "IN" },
  ];

  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // Default to null
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [isCelcius, setisCelcius] = useState(true);

  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchWeatherByCity(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherByCity(selectedCity);
    }
  }, [selectedCity]);

  const fetchWeatherByCity = async (cityName) => {
    try {
      const data = await getWeatherData(cityName);
      const forecast = await getForecastData(cityName);
      setWeatherData(data);
      setSelectedCity(cityName);
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
      const data = await getWeatherData([latitude, longitude], true); // Pass coordinates as an array with isCoords flag
      const forecast = await getForecastData([latitude, longitude], true);
      setWeatherData(data);
      setSelectedCity(null); // Clear selected city when using coordinates
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchUserGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  console.log(isCelcius);

  return (
    <main>
      <Header cities={cities} onCityClick={setSelectedCity} />
      <Search
        onCurrentLocationClick={fetchUserGeolocation}
        onSearch={setSearchQuery} // Set search query state
        setisCelcius={setisCelcius}
        isCelcius={isCelcius}
      />
      <TimeLocation weatherData={weatherData} />
      <TempratureData weatherData={weatherData} isCelcius={isCelcius} />
      <Forecast forecastData={forecastData} />
    </main>
  );
}

export default App;
