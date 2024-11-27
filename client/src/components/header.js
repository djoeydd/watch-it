import React from "react";

const Header = () => {
  return (
    <div className=" flex w-fit  pt-7">
      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-400 drop-shadow-lg">
        Watch{" "}
        <span className="text-white bg-purple-800 px-2 py-1 rounded-lg">
          It
        </span>
      </p>
    </div>
  );
};

export default Header;
