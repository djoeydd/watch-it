import React, { useState, useEffect, useCallback } from "react";
import { fetchTrendingMovies, fetchTrendingTV } from "../services/tmdbService";

import MovieCard from "./movieCard";

const Body = () => {
  const [movies, setMovies] = useState([]); // State for movies
  const [tvShows, setTvShows] = useState([]); // State for TV shows

  const fetchMovies = useCallback(async () => {
    try {
      const data = await fetchTrendingMovies();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }, []);

  // Fetch trending TV shows from the API
  const fetchTVShows = useCallback(async () => {
    try {
      const data = await fetchTrendingTV();
      setTvShows(data.results);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  }, []);

  useEffect(() => {
    fetchMovies(); // Calling the fetchTrendingMovies function only during the initial rendering of the app.
    fetchTVShows(); // Calling the fetchTrendingTV function only during the initial rendering of the app.
  }, [fetchMovies, fetchTVShows]); // Added fetchTrendingMovies and fetchTrendingTV to the dependency array

  return (
    <>
      <div className="bg-black px-4">
        <div className="">
          <h1 className="text-center text-light text-2xl tracking-widest py-2">
            Popular Movies
          </h1>
          <div className="flex space-x-4 px-0 overflow-x-auto py-4 md:py-2 xl:py-5 pe-4">
            {movies.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[8rem] md:w-[9rem] lg:w-[11rem] xl:w-[12rem]"
              >
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div>
              <h1 className="text-center text-light text-2xl tracking-widest bg-black py-2">
                Popular TV Shows
              </h1>
            </div>
          </div>
        </div>
        <div className=" bg-black">
          <div className="flex space-x-4 px-0 overflow-x-auto py-4 md:py-2 xl:py-5 pe-4">
            {tvShows.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[8rem] md:w-[9rem] lg:w-[11rem] xl:w-[12rem]"
              >
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
