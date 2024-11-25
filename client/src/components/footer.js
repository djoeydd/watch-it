import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/cinema-seat.svg"; // Import SVG as React component
import { ReactComponent as MoviesIcon } from "../assets/movie-camera.svg";
import { ReactComponent as TvIcon } from "../assets/tv-television.svg";
import { ReactComponent as ProfileIcon } from "../assets/cinema-film.svg";

const Footer = () => {
  //get current route
  const location = useLocation();

  const data = [
    {
      icon: HomeIcon,
      text: "Home",
      link: "/",
    },
    {
      icon: MoviesIcon,
      text: "Movies",
      link: "/movies",
    },
    {
      icon: TvIcon,
      text: "TV",
      link: "/tv",
    },
    {
      icon: ProfileIcon,
      text: "Account",
      link: "/account",
    },
  ];

  return (
    <>
      <div className="sticky bottom-0 w-full z-50 h-16 bg-gray-900 pb-2">
        <div className="flex flex-row justify-evenly w-full h-full">
          {data.map((Val, index) => (
            <NavLink key={index} to={Val.link} className="text-center">
              <button
                className={`${
                  location.pathname === Val.link ? "text-purple-800  " : ""
                } h-full w-20`}
              >
                <Val.icon
                  className={`h-8 w-8 mx-auto ${
                    location.pathname === Val.link
                      ? "text-purple-800"
                      : "text-gray-300"
                  }`}
                />
                <h5 className="pt-1 text-gray-300 text-xs">{Val.text}</h5>
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
