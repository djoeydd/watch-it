import React from "react";

const Search = () => {
  return (
    <>
      <div className="relative bg-black px-6 pb-8 pt-10">
        <input
          type="search"
          placeholder="Enter a movie name"
          className="w-full h-10 px-5 rounded-2xl text-white bg-gray-800 ring-1 ring-white focus:outline-none top-5 z-50 max-w-72"
        />
      </div>
    </>
  );
};

export default Search;
