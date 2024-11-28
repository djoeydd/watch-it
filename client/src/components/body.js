import React, { useState, useEffect, useCallback } from "react";
import {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchInTheaters,
  fetchMovieVideos,
} from "../services/tmdbService";
import Header from "./header";
import Search from "./searchBar";
import DropdownMenu from "./dropdown";
import MediaList from "./mediaList";
import TrailerList from "./TrailerList";

const Body = () => {
  const [movies, setMovies] = useState([]); // State for movies
  const [tvShows, setTvShows] = useState([]); // State for TV shows
  const [nowPlaying, setNowPlaying] = useState([]); // State for in-theater movies
  const [randomTrailers, setRandomTrailers] = useState([]); // State for random trailers
  const [snappedIndex, setSnappedIndex] = useState(0); // State for snapped index

  const menuItems = [
    { href: "#", text: "Today" },
    { href: "#", text: "Weekly" },
  ];

  // Fetch movies and random trailers
  const fetchMovies = useCallback(async () => {
    try {
      const data = await fetchTrendingMovies();
      const moviesWithVideos = await Promise.all(
        data.results.map(async (movie) => {
          const videoKey = await fetchMovieVideos(movie.id);
          return { ...movie, videoKey };
        })
      );
      setMovies(moviesWithVideos);

      // Pick 5 random trailers
      const randomSelection = getRandomTrailers(moviesWithVideos);
      setRandomTrailers(randomSelection);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, []);

  // Fetch TV shows
  const fetchTVShows = useCallback(async () => {
    try {
      const data = await fetchTrendingTV();
      setTvShows(data.results);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  }, []);

  // Fetch in-theater movies
  const fetchNowPlaying = useCallback(async () => {
    try {
      const data = await fetchInTheaters();
      const moviesWithMediaType = data.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));
      setNowPlaying(moviesWithMediaType);
    } catch (error) {
      console.error("Error fetching in-theater movies:", error);
    }
  }, []);

  // Helper function to get 5 random trailers
  const getRandomTrailers = (movies) => {
    // Filter out movies without a videoKey
    const moviesWithTrailers = movies.filter((movie) => movie.videoKey);

    // Randomly select 5 movies with trailers
    return moviesWithTrailers.sort(() => 0.5 - Math.random()).slice(0, 5);
  };

  // Fetch data on initial render
  useEffect(() => {
    fetchMovies();
    fetchTVShows();
    fetchNowPlaying();
  }, [fetchMovies, fetchTVShows, fetchNowPlaying]);
  return (
    <>
      <div className="flex flex-col bg-gray-900 px-1 min-h-screen pb-14">
        <div className="flex justify-between px-3">
          <Header />
          <Search />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-300 text-xl tracking-widest pt-2 pl-2">
            Popular Movies
          </h1>
          <DropdownMenu buttonText="Weekly" menuItems={menuItems} />
        </div>

        <MediaList mediaList={movies} />

        <div className="px-2">
          <TrailerList movies={randomTrailers} />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-300 text-xl tracking-widest pt-2 pl-2">
            Popular TV Shows
          </h1>
          <DropdownMenu buttonText="Weekly" menuItems={menuItems} />
        </div>
        <MediaList mediaList={tvShows} />
        <div>
          <h1 className="text-gray-300 text-xl tracking-widest pt-2 pl-2">
            In Theaters
          </h1>
        </div>

        <MediaList mediaList={nowPlaying} />
      </div>
    </>
  );
};

export default Body;
