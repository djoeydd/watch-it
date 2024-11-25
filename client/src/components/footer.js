import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faPerson } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const data = [
    {
      icon: faFilm,
      text: "Home",
      link: "/",
    },
    {
      icon: faPerson,
      text: "Account",
      link: "/account",
    },
    {
      icon: faFilm,
      text: "Movies",
      link: "/movies",
    },
    {
      icon: faPerson,
      text: "TV shows",
      link: "/tv",
    },
  ];
  //get current route
  const location = useLocation();

  return (
    <>
      <div className="sticky bottom-0 w-full z-50 h-20 bg-gray-800 ">
        <div className="flex flex-row justify-evenly w-full h-full">
          {data.map((Val, index) => (
            <NavLink key={index} to={Val.link} className="text-center">
              <button
                className={`${
                  location.pathname === Val.link ? "bg-purple-800  " : ""
                } h-full w-20`}
              >
                <FontAwesomeIcon
                  icon={Val.icon}
                  className="fa-inverse fa-1x text-slate-50"
                />
                <h5 className="pt-0 text-slate-50">{Val.text}</h5>
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
