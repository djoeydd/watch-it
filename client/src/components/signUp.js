import React from "react";

const SignUp = () => {
  return (
    <div>
      <div className="relative flex min-h-screen flex-col pt-10 overflow-hidden bg-gray-900 py-6 sm:py-12">
        <div className=" w-9/12 mx-auto gap-3">
          <h1 className="text-xl tracking-wide text-white ">
            <span className="tracking-wider text-2xl text-purple-600 font-semibold">
              Sign{" "}
            </span>{" "}
            up for a{" "}
            <span className="tracking-wider text-2xl text-purple-600 font-semibold">
              free
            </span>{" "}
            account
          </h1>
          <h3 className="text-sm text-gray-500 pb-3 pt-1">
            {" "}
            Enjoy unlimited movies and TV shows
          </h3>
          <form className="flex flex-col gap-3">
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="text"
              placeholder="Last Name"
              required
            />
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="username"
              placeholder="Username"
              required
            />
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="password"
              placeholder="Password (8 characters minimum)"
              required
            />
            <input
              className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <div className="flex items-center justify-between">
              <button className="w-2/5 bg-purple-800 font-semibold text-white text-sm rounded-xl px-3 py-2 uppercase">
                Log in
              </button>
              <button className="w-2/5 bg-purple-800 font-semibold text-white text-sm rounded-xl px-3 py-2 uppercase">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
