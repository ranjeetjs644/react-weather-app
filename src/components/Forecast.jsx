import React from "react";

const Forecast = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) return null;

  // Slice the first 10 items from forecastData
  const slicedData = forecastData.slice(0, 10); // Change 10 to the number of items you want to display

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    return `${day} ${month} ${dayOfWeek}`;
  };

  return (
    <div className="w-[80%] mx-auto text-neutral-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {slicedData.map((data, index) => (
        <div className="flex flex-col items-center justify-center bg-white my-2 shadow-sm rounded-lg p-4 text-center" key={index}>
          <p className="text-lg font-semibold">{data.time}</p>
          <p className="text-sm">{formatDate(data.date)}</p>
          <img
            src={data.weatherIcon}
            alt={data.weatherDescription}
            className="mx-auto"
            width={60}
          />
          <p className="text-lg">{Math.round(data.temperature)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
