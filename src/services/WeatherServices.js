const apiKey = "7f6a1a920ba20b00a85493c610c5b2bf";

const getWeatherData = async (cityNameOrCoords, isCoords = false) => {
  let url;
  if (isCoords) {
    const [latitude, longitude] = cityNameOrCoords;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameOrCoords}&appid=${apiKey}&units=metric`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const formattedData = {
      date: new Date(data.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      localTime: new Date((data.dt + data.timezone) * 1000).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: data.timeZone,
        }
      ),
      location: `${data.name}, ${data.sys.country}`,
      weather: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      high: data.main.temp_max,
      low: data.main.temp_min,
    };
    return formattedData;
  } catch (err) {
    console.error("Error fetching weather data:", err);
    throw err;
  }
};

const getForecastData = async (cityNameOrCoords, isCoords = false) => {
  let url;
  if (isCoords) {
    const [latitude, longitude] = cityNameOrCoords;
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityNameOrCoords}&appid=${apiKey}&units=metric`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const formattedData = data.list.map((forecast) => ({
      date: new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: new Date(forecast.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      temperature: forecast.main.temp,
      weather: forecast.weather[0].main,
      weatherDescription: forecast.weather[0].description,
      weatherIcon: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
    }));
    return formattedData;
  } catch (err) {
    console.error("Error fetching forecast data:", err);
    throw err;
  }
};

export { getWeatherData, getForecastData };
