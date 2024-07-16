import React from "react";

const Header = ({ cities, onCityClick }) => {
  return (
    <header className="w-[90%] mx-auto mt-4 rounded-sm py-2">
      <div className="hidden w-[85%] shadow-md bg-gray-700 md:flex flex-wrap items-center justify-center gap-x-8 mx-auto sm:py-2">
        {cities.map((city) => (
          <button
            key={city.id}
            className="p-2 px-3 text-white hover:bg-gray-800 rounded transition-all duration-200"
            onClick={() => onCityClick(city.name)}
          >
            {city.name}, {city.country}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
