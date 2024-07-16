import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDroplet } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempratureData = ({ weatherData, isCelcius }) => {
  if (!weatherData){
    return <div className="text-center text-xl  ">Allow Location or Search...</div>
  };

  const temp = isCelcius
    ? weatherData.temperature
    : (weatherData.temperature * 9) / 5 + 32;

  const verticalTempData = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real feel",
      value: `${
        isCelcius ? weatherData.feelsLike : (weatherData.feelsLike * 9) / 5 + 32
      } ${isCelcius ? "c" : "f"}`,
    },
    {
      id: 2,
      Icon: BiSolidDroplet,
      title: "Humidity",
      value: `${weatherData.humidity}`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind Speed",
      value: `${weatherData.windSpeed}`,
    },
  ];

  const horizontalTempData = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: `${weatherData.sunrise}`,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: `${weatherData.sunset}`,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${
        isCelcius ? weatherData.high : (weatherData.high * 9) / 5 + 32
      } ${isCelcius ? "C" : "F"}`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${isCelcius ? weatherData.low : (weatherData.low * 9) / 5 + 32} ${
        isCelcius ? "C" : "F"
      }`,
    },
  ];

  return (
    <>
      <div className="w-[80%] mx-auto text-neutral-700 py-2 bg-slate-300 shadow-sm">
        <div className="flex flex-wrap items-center justify-center text-neutral-700 py-6 text-xl">
          <p>{weatherData.weather}</p>
        </div>
        <div className="flex flex-wrap items-center justify-around py-3">
          <img
            src={`${weatherData.weatherIcon}`}
            alt="weather icon"
            className="w-20"
          />
          <p className="text-3xl text-neutral-700">
            {temp} {isCelcius ? "°c" : "°f"}
          </p>
          <div className="flex space-y-3 items-start flex-col">
            {verticalTempData.map((item) => (
              <div key={item.id} className="flex items-center justify-center">
                <item.Icon size={16} className="mr-1" />
                {item.title} :{" "}
                <span className="font-medium ml-1 ">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center space-x-12 p-4">
          {horizontalTempData.map((item) => (
            <div key={item.id} className="flex items-center">
              <item.Icon size={28} />
              <p>
                {item.title} :{" "}
                <span className="font-medium ml-1 ">{item.value}</span>{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TempratureData;
