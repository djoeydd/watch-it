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
    logo,
  } = movie;
  movie.first_air_date = first_air_date ? first_air_date.substring(0, 4) : null; // Extracting the year from the first air date
  movie.release_date = release_date ? release_date.substring(0, 4) : null; // Extracting the year from the release date

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/singleMovie/${id}`, { state: { movie } });
  };

  return (
    <div className="card bg-black h-100 hover:border-white hover:border-2 hover:opacity-90">
      <img
        src={poster_path ? `${img_300}/${poster_path}` : unavailable}
        className="card-img-top pt-0 pb-0 px-0"
        alt={title || name}
        onClick={handleClick}
      />
    </div>
  );
};

export default MovieCard;
