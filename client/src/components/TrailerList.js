import React, { memo, useState, useEffect, useRef } from "react";

const TrailerList = memo(({ movies }) => {
  const [snappedIndex, setSnappedIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const children = container.children;
      let closestIndex = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const rect = child.getBoundingClientRect();
        const distance = Math.abs(
          rect.left - container.getBoundingClientRect().left
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      setSnappedIndex(closestIndex);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-4">
        <h1 className=" text-gray-300 text-xl tracking-widest pt-2 mb-2 pl-2">
          Trailers{" "}
        </h1>
        <div className=" col-span-2 flex flex-row gap-2 items-end pb-3 justify-center">
          {movies.map((_, index) => (
            <div
              key={index}
              className={`bg-gray-300 rounded-full ${
                snappedIndex === index ? "h-3" : "h-2"
              } w-2`}
            ></div>
          ))}
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-row overflow-x-auto space-x-4 h-56 snap-mandatory snap-x"
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="flex w-full snap-center first:pl-2 last:pr-2"
          >
            {movie.videoKey ? (
              <iframe
                className="w-[360px] h-[200px]"
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
    </>
  );
});

export default TrailerList;
