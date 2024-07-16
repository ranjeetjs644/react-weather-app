import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiCurrentLocation } from "react-icons/bi";

function Search({ onCurrentLocationClick, onSearch, setisCelcius, isCelcius }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleUnitChange = () => {
    if (isCelcius) {
      setisCelcius(false);
    } else {
      setisCelcius(true);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center my-2 mx-2 sm:mx-0">
      <div className="w-full sm:w-2/4 flex flex-row items-center justify-center space-x-3 text-neutral-700 pr-3">
        <input
          type="text"
          placeholder="Search by city..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full text-gray-800 rounded py-1.5 px-4 my-2 focus:outline-none tracking-wider border border-gray-300"
        />
        <BiSearch
          size={25}
          className="cursor-pointer transition-all ease-out duration-200 hover:scale-125"
          onClick={handleSearch}
        />
        <BiCurrentLocation
          size={25}
          className="cursor-pointer transition-all ease-out duration-200 hover:scale-125"
          onClick={onCurrentLocationClick}
        />
      </div>
      <div className="w-full sm:w-1/6 flex flex-row flex-wrap justify-center items-center text-neutral-700">
        <button
          onClick={handleUnitChange}
          className="text-xl font-semibold cursor-pointer transition-all ease-out hover:scale-125"
        >
          °C
        </button>
        <p className="text-xl font-semibold mx-[3px]"> | </p>
        <button
          onClick={handleUnitChange}
          className="text-xl font-semibold cursor-pointer transition-all ease-out hover:scale-125"
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Search;
