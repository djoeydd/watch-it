import React, { useState, useEffect, useCallback } from "react";
import {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchInTheaters,
} from "../services/tmdbService";
import Header from "./header";
import MovieCard from "./movieCard";

const Body = () => {
  const [movies, setMovies] = useState([]); // State for movies
  const [tvShows, setTvShows] = useState([]); // State for TV shows
  const [nowPlaying, setNowPlaying] = useState([]); // State for in-theater movies

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

  const fetchNowPlaying = useCallback(async () => {
    try {
      const data = await fetchInTheaters();
      setNowPlaying(data.results);
    } catch (error) {
      console.error("Error fetching in-theater movies:", error);
    }
  });

  useEffect(() => {
    fetchMovies(); // Calling the fetchTrendingMovies function only during the initial rendering of the app.
    fetchTVShows(); // Calling the fetchTrendingTV function only during the initial rendering of the app.
    fetchNowPlaying();
  }, []); // Added fetchTrendingMovies and fetchTrendingTV to the dependency array

  return (
    <>
      <Header />

      <div className="bg-gray-900 px-3 min-h-screen">
        <div className="">
          <h1 className=" text-gray-300 text-2xl tracking-widest pt-2">
            Popular Movies
          </h1>
          <div className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4">
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
          <h1 className=" text-gray-300 text-2xl tracking-widest pt-2">
            Popular TV Shows
          </h1>
        </div>
        <div className="">
          <div className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4">
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
        <div>
          <h1 className=" text-gray-300 text-2xl tracking-widest pt-2">
            In Theaters
          </h1>
        </div>
        <div className="">
          <div className="flex space-x-4 px-0 overflow-x-auto py-2 md:py-2 xl:py-5 pe-4">
            {nowPlaying.map((item) => (
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
