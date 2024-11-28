import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./movieCard";

const MediaList = ({ mediaList }) => {
  /*const [snappedIndex, setSnappedIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const totalItems = mediaList.length;
      const itemWidth = scrollWidth / (totalItems - 1);
      const closestIndex = Math.round(scrollLeft / itemWidth);

      setSnappedIndex(closestIndex);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [mediaList.length]); */

  return (
    <>
      <div className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4 snap-mandatory snap-x">
        {mediaList.map((item) => (
          <div key={item.id} className="snap-start snap-always">
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
      {/*
      <div className="grid grid-cols-4 pt-2">
        <div className="flex flex-row justify-evenly w-screen items-end -m-1 px-1">
          {mediaList.map((_, index) => (
            <div
              key={index}
              className={`bg-gray-300 rounded-full ${
                snappedIndex === index
                  ? "h-5"
                  : Math.abs(snappedIndex - index) === 1
                  ? "h-4"
                  : Math.abs(snappedIndex - index) === 2
                  ? "h-3"
                  : "h-2"
              } w-0.5 md:hidden sm:hidden`
            ></div>}
          ))}
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4"
      >
        {mediaList.map((item) => (
          <div key={item.id} className="snap-start snap-always">
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
    
  
*/}
    </>
  );
};
export default MediaList;
