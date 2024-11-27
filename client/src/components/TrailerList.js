import React, { memo } from "react";

const TrailerList = memo(({ movies }) => {
  return (
    <div className="flex flex-row overflow-x-auto space-x-4 h-56 snap-mandatory snap-x">
      {movies.map((movie) => (
        <div key={movie.id} className="snap-center">
          {movie.videoKey ? (
            <iframe
              width="360"
              height="200"
              src={`https://www.youtube.com/embed/${movie.videoKey}`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      ))}
    </div>
  );
});

export default TrailerList;
