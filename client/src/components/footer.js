import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faPerson } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

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
    {
      icon: faFilm,
      text: "Search",
      link: "/search",
    },
  ];
  return (
    <>
      <div className="navbar-container">
        <div className="">
          <div className="w-full text-center bg-gray-800 footer">
            {data.map((Val) => {
              return (
                <>
                  <NavLink to={Val.link} className="btn btn-dark h-100">
                    <button className="">
                      <FontAwesomeIcon icon={Val.icon} id="fire" />
                      <br />
                      <h5 className="pt-1 fs-6">{Val.text}</h5>
                    </button>
                  </NavLink>
                </>
              );
            })}
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
