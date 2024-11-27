import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from "../assets/star.svg";

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
  const [isStarFilled, setIsStarFilled] = useState(false); // State to manage star fill

  movie.first_air_date = first_air_date ? first_air_date.substring(0, 4) : null; // Extracting the year from the first air date
  movie.release_date = release_date ? release_date.substring(0, 4) : null; // Extracting the year from the release date

  const navigate = useNavigate();

  const handleClick = () => {
    const path =
      media_type === "movie" ? `/singleMovie/${id}` : `/singleTv/${id}`;
    navigate(path, { state: { movie } });
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    setIsStarFilled(!isStarFilled);
  };

  const getStrokeColor = (vote) => {
    if (vote < 6) return "text-red-600";
    if (vote < 7.5) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="block rounded-lg w-[7rem] md:w-[9rem] lg:w-[10rem] xl:w-[12rem]">
      <div className="relative">
        <img
          loading="lazy"
          src={poster_path ? `${img_300}/${poster_path}` : unavailable}
          className=" rounded-t-md pt-0 pb-0 px-0"
          alt={title || name}
          onClick={handleClick}
        />
        {/*}
        <div className="absolute top-1 right-1" onClick={handleStarClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
              stroke="#6B21A8"
              strokeWidth={isStarFilled ? "0" : "2.5"}
              fill={isStarFilled ? "#FFD700" : "none"} // Toggle fill color
            />
          </svg>
        </div>
        */}
      </div>
      <div className="relative w-8 h-8 bg-white  rounded-full border-purple-800 border-2 bottom-3 left-3 -m-2">
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
            strokeDashoffset={`calc(251.2px - (251.2px * ${Math.round(
              vote_average * 10
            )}) / 100)`}
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
      <div className="card-body flex-col flex p-0 mt-0">
        <h5 className="card-title text-gray-300 text-start mb-0 text-sm font-semibold">
          {title || name}
        </h5>

        <span className="text-xs text-gray-300 text-start">
          {movie.release_date || movie.first_air_date}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
