import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center w-100 text-uppercase p-3 bg-dark text-light header">
            <FontAwesomeIcon icon={faVideo} /> &nbsp;&nbsp; Watch It
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
