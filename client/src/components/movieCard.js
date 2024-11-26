import React from "react";
import { useNavigate } from "react-router-dom";

const img_300 = "https://image.tmdb.org/t/p/w300"; // Base URL for images
const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg"; // Path to a placeholder image

const MovieCard = ({ movie }) => {
  const {
    id,
    poster_path,
    title,
    name,
    media_type,
    first_air_date,
    release_date,
    vote_average,
    logo,
  } = movie;
  movie.first_air_date = first_air_date ? first_air_date.substring(0, 4) : null; // Extracting the year from the first air date
  movie.release_date = release_date ? release_date.substring(0, 4) : null; // Extracting the year from the release date

  const navigate = useNavigate();

  const handleClick = () => {
    const path =
      media_type === "movie" ? `/singleMovie/${id}` : `/singleTv/${id}`;
    navigate(path, { state: { movie } });
  };

  const getStrokeColor = (vote) => {
    if (vote < 6) return "text-red-600";
    if (vote < 7.5) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="card bg-gray-900 h-fit hover:border-white hover:border-2 hover:opacity-90 pb-0 border-none">
      <img
        src={poster_path ? `${img_300}/${poster_path}` : unavailable}
        className="card-img-top pt-0 pb-0 px-0"
        alt={title || name}
        onClick={handleClick}
      />
      <div className="relative w-8 h-8 bg-white bg-opacity-80 rounded-full border-purple-800 border-2 bottom-4 left-2">
        <svg class="w-full h-fill" viewBox="0 0 100 100">
          <circle
            className="text-transparent stroke-current"
            stroke-width="0"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>{" "}
          <circle
            className={`${getStrokeColor(
              vote_average
            )} progress-ring__circle stroke-current`}
            stroke-width="8"
            stroke-linecap="sqare"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke-dasharray="251.2"
            stroke-dashoffset="calc(251.2px - (251.2px * 70) / 100)"
          ></circle>
          <text
            x="50"
            y="50"
            font-family="Verdana"
            font-size="36"
            text-anchor="middle"
            alignment-baseline="middle"
          >
            {Math.round(vote_average * 10)}
          </text>
        </svg>
      </div>
      <div className="card-body flex-col flex p-0">
        <h5 className="card-title text-gray-300 text-center mb-0">
          {title || name}
        </h5>
        <span className="text-sm text-gray-300 text-center">
          {movie.release_date || movie.first_air_date}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
