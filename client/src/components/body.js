import React, { useState, useEffect, useCallback } from "react";
import "./body.css";
import MovieCard from "./movieCard";

const Body = () => {
  const [movies, setMovies] = useState([]); // State for movies
  const [tvShows, setTvShows] = useState([]); // State for TV shows

  const fetchTrendingMovies = useCallback(async () => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_AUTH_}`,
      },
    };

    try {
      const response = await fetch(url, options);

      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Fetching data from API in JSON Format
      console.log(data); // Log the data to see what is being returned

      // Fetch logos for each movie and update the movie object
      const moviesWithLogos = await Promise.all(
        data.results.map(async (movie) => {
          const logo = await fetchMovieLogo(movie.id);
          return { ...movie, logo };
        })
      );

      setMovies(moviesWithLogos); // Storing that data in the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []); // Empty dependency array ensures the function is memoized

  const fetchMovieLogo = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/images`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_AUTH_}`,
      },
    };

    try {
      const response = await fetch(url, options);

      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Fetching data from API in JSON Format
      console.log(data); // Log the data to see what is being returned

      // Extract the logo URL
      const logo =
        data.logos && data.logos.length > 0 ? data.logos[0].file_path : null;
      return logo;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const fetchTrendingTV = useCallback(async () => {
    const url =
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);

      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Fetching data from API in JSON Format
      console.log(data); // Log the data to see what is being returned
      setTvShows(data.results); // Storing that data in the state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []); // Empty dependency array ensures the function is memoized

  useEffect(() => {
    fetchTrendingMovies(); // Calling the fetchTrendingMovies function only during the initial rendering of the app.
    fetchTrendingTV(); // Calling the fetchTrendingTV function only during the initial rendering of the app.
  }, [fetchTrendingMovies, fetchTrendingTV]); // Added fetchTrendingMovies and fetchTrendingTV to the dependency array

  return (
    <>
      <div>
        <div>
          <div>
            <h1 className="text-center text-light text-2xl tracking-widest bg-black pt-4">
              Popular Movies
            </h1>
          </div>
        </div>
      </div>
      <div className=" bg-black">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4 md:p-2 xl:p-5">
          {movies.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>
      <div>
        <div>
          <div>
            <h1 className="text-center text-light text-2xl tracking-widest bg-black pt-4">
              Popular TV Shows
            </h1>
          </div>
        </div>
      </div>
      <div className=" bg-black">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4 md:p-2 xl:p-5">
          {tvShows.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
