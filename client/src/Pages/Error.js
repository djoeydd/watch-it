import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Hold up</h1>
        <img src="/images/devError.gif" />
        <p className="text-m px-5">
          This shits broken, our devs (Joe) are currently hard at work on a fix.
        </p>
      </div>
    </div>
  );
};

export default Error;
