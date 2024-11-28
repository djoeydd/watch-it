import React, { useState } from "react";

const SignUp = ({ setAuthToken, setIsUserLoggedIn, setEmail }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      alert("Account with that email already exists");

      if (response.ok) {
        console.log("Sign up successful");
        const { token } = data;
        localStorage.setItem("authToken", token); // Store token in localStorage
        setAuthToken(token);
        setIsUserLoggedIn(true);
        setEmail(formData.email);
      } else {
        throw new Error(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <div className="relative flex min-h-fit flex-col pt-10 overflow-hidden bg-gray-900 py-6 sm:py-12">
      <div className="w-9/12 mx-auto gap-3">
        <h1 className="text-xl tracking-wide text-white ">
          <span className="tracking-wider text-2xl text-purple-600 font-semibold">
            Sign
          </span>{" "}
          up for a{" "}
          <span className="tracking-wider text-2xl text-purple-600 font-semibold">
            free
          </span>{" "}
          account
        </h1>
        <h3 className="text-sm text-gray-500 pb-3 pt-1">
          Enjoy unlimited movies and TV shows
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            className="rounded-1 py-1 px-2 caret-transparent shadow-sm bg-gray-800 text-white focus:outline-purple-600"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          <div className="flex items-center justify-between">
            <button
              className="w-2/5 bg-purple-800 font-semibold text-white text-sm rounded-xl px-3 py-2 uppercase"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
