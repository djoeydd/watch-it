import React from "react";
import Footer from "./footer";

const Error = () => {
  return (
    <>
      <div className="flex items- justify-center min-h-screen bg-white pt-5">
        <div className="px-5 text-center flex-col">
          <h1 className="text-4xl font-bold text-purple-600">Hold up</h1>
          <img src="/images/devError.gif" className="max-h-96 mx-auto" />
          <p className="text-m px-5">
            This shits broken, our devs (Joe) are currently hard at work on a
            fix.
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
