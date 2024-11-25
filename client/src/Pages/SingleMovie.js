import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovieLogos, fetchMovieVideos } from "../services/tmdbService";
import VideoPlayer from "../components/videoPlayer";

const img_500 = "https://image.tmdb.org/t/p/w500"; // Base URL for images
const img_1280 = "https://image.tmdb.org/t/p/w1280"; // Base URL for higher resolution images

const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg"; // Path to a placeholder image

const SingleMovie = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [movieData, setMovieData] = useState(movie);

  const fetchVideos = useCallback(async () => {
    if (!movie) return;

    try {
      const videoKey = await fetchMovieVideos(movieData.id);
      setMovieData((prevData) => ({
        ...prevData,
        videoKey,
      }));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  }, [movieData]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const handlePlayerVisibleChange = (visible) => {
    setIsPlayerVisible(visible);
  };

  return (
    <div className="flex flex-col main-container pt-3 w-screen min-h-[calc(100vh-77.5px)] bg-gray-900">
      <img
        src={movieData.logo ? `${img_500}/${movieData.logo}` : unavailable}
        alt={movieData.title}
        className="mx-auto pb-3 max-h-24 px-4"
      />
      <div className="movie-details-container flex flex-col md:flex-row">
        <img
          src={
            movieData.backdrop_path
              ? `${img_1280}/${movieData.backdrop_path}`
              : unavailable
          }
          alt={movie.title}
          className="backdrop-image mx-auto w-full"
        />
        <p className="mt-4 leading-[1.6] text-white text-sm px-3 pb-2">
          {movieData.overview}
        </p>
      </div>
      <div
        className={`flex flex-col ${
          isPlayerVisible ? "w-fit" : "w-1/4"
        } mx-auto`}
      >
        <VideoPlayer
          videoid={movieData.videoKey}
          onPlayerVisibleChange={handlePlayerVisibleChange}
        />
      </div>
    </div>
  );
};

export default SingleMovie;
