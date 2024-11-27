import React, { useState, useEffect, useRef, useCallback } from "react";
import DropdownMenu from "../components/dropdown";
import genreMapping from "../utils/genreMapping";
import { discoverMovies } from "../services/tmdbService";
import MovieCard from "../components/movieCard";

const Movies = () => {
  const [filters, setFilters] = useState({
    include_adult: false,
    include_video: true,
    language: "en-US",
    sort_by: "popularity.desc",
  }); // Static filters

  const [dynamicFilters, setDynamicFilters] = useState([]); // Dynamic filters
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage open dropdown
  const observer = useRef();

  const date = new Date().toISOString().split("T")[0];

  // Fetch movies from the API
  const fetchMovies = async (page = 1) => {
    try {
      // Combine static filters and dynamic filters into one object
      const combinedFilters = {
        ...filters,
        page,
        ...Object.assign({}, ...dynamicFilters),
      };

      const moviesData = await discoverMovies(combinedFilters);
      setMovies((prevMovies) => {
        const movieIds = new Set(prevMovies.map((movie) => movie.id));
        const newMovies = moviesData.results.filter(
          (movie) =>
            !movieIds.has(movie.id) &&
            movie.release_date < new Date().toISOString()
        );
        return [...prevMovies, ...newMovies];
      });
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setError(error.message);
    }
  };

  // Handle filter changes by updating the dynamicFilters array
  const handleFilterChange = (filterKey, filterValue) => {
    setDynamicFilters((prevFilters) => {
      // Remove existing filter with the same key if it exists
      const updatedFilters = prevFilters.filter(
        (filter) => !filter.hasOwnProperty(filterKey)
      );
      // Add the new filter
      return [...updatedFilters, { [filterKey]: filterValue }];
    });
  };

  const clearFilters = () => {
    setDynamicFilters([]);
  };

  // Reset movies and fetch the first page when filters or dynamicFilters change
  useEffect(() => {
    setMovies([]); // Clear movies when filters change
    setCurrentPage(1);
    fetchMovies(1); // Reset to first page
  }, [filters, dynamicFilters]);

  // Fetch subsequent pages
  useEffect(() => {
    if (currentPage > 1) {
      fetchMovies(currentPage);
    }
  }, [currentPage]);

  // Create menu items for filters
  const genreMenuItems = Object.keys(genreMapping).map((key) => ({
    href: "#",
    text: genreMapping[key],
    onClick: () => handleFilterChange("with_genres", key),
  }));

  const yearMenuItems = Array.from(
    { length: date.split("-")[0] - 1959 },
    (_, i) => {
      const year = date.split("-")[0] - i;
      return {
        href: "#",
        text: year,
        onClick: () => handleFilterChange("primary_release_year", year),
      };
    }
  );

  const sortByMenuItems = [
    {
      href: "#",
      text: "Popularity",
      onClick: () => handleFilterChange("sort_by", "popularity.desc"),
    },
    {
      href: "#",
      text: "Release Date",
      onClick: () => handleFilterChange("sort_by", "release_date.desc"),
    },
    {
      href: "#",
      text: "Rating",
      onClick: () => handleFilterChange("sort_by", "vote_average.desc"),
    },
  ];

  const ratingMenuItems = [
    {
      href: "#",
      text: "G",
      onClick: () => handleFilterChange("certification", "G"),
    },
    {
      href: "#",
      text: "PG",
      onClick: () => handleFilterChange("certification", "PG"),
    },
    {
      href: "#",
      text: "PG-13",
      onClick: () => handleFilterChange("certification", "PG-13"),
    },
  ];

  // Infinite scrolling logic
  const lastMovieElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-900 px-3 min-h-screen pt-2">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between w-full max-h-8 m-3 pr-4 ">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-400 drop-shadow-lg pb-3">
              Movies
            </h1>
            {dynamicFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className="bg-purple-800 opacity-90 text-gray-300 px-4 py-2 rounded-md w-32 text-xs "
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="flex flex-row min-w-fill justify-around pb-3">
            <DropdownMenu
              buttonText="Genre"
              menuItems={genreMenuItems}
              isOpen={openDropdown === "genre"}
              setOpenDropdown={() =>
                setOpenDropdown(openDropdown === "genre" ? null : "genre")
              }
            />
            <div className="flex h-fill py-1 border-l px-1"></div>
            <DropdownMenu
              buttonText="Year"
              menuItems={yearMenuItems}
              isOpen={openDropdown === "year"}
              setOpenDropdown={() =>
                setOpenDropdown(openDropdown === "year" ? null : "year")
              }
            />
            <div className="flex h-fill py-1 border-l px-1"></div>
            <DropdownMenu
              buttonText="Sort By"
              menuItems={sortByMenuItems}
              isOpen={openDropdown === "sortBy"}
              setOpenDropdown={() =>
                setOpenDropdown(openDropdown === "sortBy" ? null : "sortBy")
              }
            />
            <div className="flex h-fill py-1 border-l"></div>
            <DropdownMenu
              buttonText="Rating"
              menuItems={ratingMenuItems}
              isOpen={openDropdown === "rating"}
              setOpenDropdown={() =>
                setOpenDropdown(openDropdown === "rating" ? null : "rating")
              }
            />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-3 md:grid-cols-5">
          {movies.map((movie, index) => {
            if (movies.length === index + 1) {
              return (
                <div ref={lastMovieElementRef} key={movie.id} className="flex">
                  <MovieCard movie={movie} />
                </div>
              );
            } else {
              return (
                <div key={movie.id} className="flex">
                  <MovieCard movie={movie} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Movies;
