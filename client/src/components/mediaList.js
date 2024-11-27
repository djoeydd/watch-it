import React from "react";
import MovieCard from "./movieCard";

const MediaList = ({ mediaList }) => {
  return (
    <div className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4 snap-mandatory snap-x">
      {mediaList.map((item) => (
        <div key={item.id} className="snap-start snap-always">
          <MovieCard movie={item} />
        </div>
      ))}
    </div>
  );
};

export default MediaList;
