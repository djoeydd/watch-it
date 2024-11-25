import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchTvLogos } from "../services/tmdbService";
import VideoPlayer from "../components/videoPlayer";
import Footer from "../components/footer";

const img_500 = "https://image.tmdb.org/t/p/w500"; // Base URL for images
const img_1280 = "https://image.tmdb.org/t/p/w1280"; // Base URL for higher resolution images

const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg"; // Path to a placeholder image

const genreMapping = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  10768: "War & Politics",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10767: "Talk",
  10766: "Soap",
  10770: "TV Movie",
};

const SingleTv = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [movieData, setMovieData] = useState(movie);

  const fetchLogos = useCallback(async () => {
    if (!movie) return;

    try {
      const logo = await fetchTvLogos(movieData.id);
      setMovieData((prevData) => ({
        ...prevData,
        logo,
      }));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  }, [movieData]);

  useEffect(() => {
    fetchLogos();
  }, []);
  console.log(movieData);
  const handlePlayerVisibleChange = (visible) => {
    setIsPlayerVisible(visible);
  };

  return (
    <>
      <div className="flex flex-col pt-3 w-screen h-screen bg-gray-900">
        {movieData.logo ? (
          <img
            src={`${img_500}/${movieData.logo}`}
            alt={movieData.title}
            className="mx-auto pb-3 max-h-24 px-4"
          />
        ) : (
          <p className="text-center text-white text-2xl pb-3 px-4">
            {movieData.title}
          </p>
        )}
        <div className="movie-details-container flex flex-col md:flex-row">
          <img
            src={
              movieData.backdrop_path
                ? `${img_1280}/${movieData.backdrop_path}`
                : unavailable
            }
            alt={movieData.title}
            className="backdrop-image mx-auto w-full"
          />
          <div className="flex flex-col px-3 pt-1">
            <div className="flex flex-wrap mt-2 gap-2">
              {movieData.genre_ids &&
                movieData.genre_ids.map((genre_id) => (
                  <span
                    key={genre_id} // Use genre_id instead of id
                    className="bg-purple-800 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {genreMapping[genre_id]}
                  </span>
                ))}
            </div>

            <h1 className="text-purple-600 text-xl font-semibold mt-3">
              Summary
            </h1>
            <div className="flex">
              <p className="mt-1 leading-[1.6] text-gray-300 text-xs pb-2 hyphens-auto ">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTv;
