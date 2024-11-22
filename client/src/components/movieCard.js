import React from "react";
import "./movieCard.css";

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
  console.log(movie);

  const handleClick = () => {
    alert(id);
  };

  return (
    <div className="">
      <div className="card bg-black h-100 hover:border-white hover:border-2 hover:opacity-90">
        <img
          src={poster_path ? `${img_300}/${poster_path}` : unavailable}
          className="card-img-top pt-0 pb-0 px-0" // Tailwind class for border radius
          alt={title || name}
          onClick={handleClick}
        />
        {/* <div className="card-body"> 
                {logo ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w300${logo}`}
                        alt={title || name}
                        className="card-title text-center text-light fs-5 rounded-lg" // Tailwind class for border radius
                    />
                ) : (
                     <h5 className="card-title text-center text-light fs-5">
                        {title || name}
                    </h5>
                )}
                <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                    <div className="text-center text-light fs-5 font-semibold">
                        {first_air_date || release_date}
                    </div>
                </div>
            </div> */}
      </div>
    </div>
  );
};

export default MovieCard;
