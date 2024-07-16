import React from "react";

const TimeLocation = ({ weatherData }) => {
  if (!weatherData) return null;
  console.log(weatherData);
  return (
    <div className=" flex flex-col flex-wrap items-center justify-center my-4 text-neutral-700">
      <div className="my-2 flex flex-wrap items-center justify-center">
        <p className="text-base text-center font-light">
          {weatherData.date}| Local time: {weatherData.localTime}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <p className="text-2xl font-semibold text-neutral-700">
          {weatherData.location}
        </p>
      </div>
    </div>
  );
};

export default TimeLocation;
