import React, { useState, useEffect } from "react";
import SignUp from "../components/signUp";
import LogIn from "../components/logIn";

const Account = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between sign up and login
  };

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem("authToken");
    const storedEmail = localStorage.getItem("email");
    if (token) {
      setAuthToken(token);
      setIsUserLoggedIn(true);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    setIsUserLoggedIn(false);
    setEmail("");
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {isUserLoggedIn ? (
        <div className="grid grid-cols-2 pt-4">
          <div>
            <h1 className="pl-4 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-400 drop-shadow-lg pb-3">
              Welcome, {email}
            </h1>
          </div>
          <button onClick={handleLogout} className="text-gray-300">
            Logout
          </button>
        </div>
      ) : (
        <>
          {isSignUp ? (
            <SignUp
              setAuthToken={setAuthToken}
              setIsUserLoggedIn={setIsUserLoggedIn}
              setEmail={setEmail} // Pass setEmail to SignUp
            />
          ) : (
            <LogIn
              setAuthToken={setAuthToken}
              setIsUserLoggedIn={setIsUserLoggedIn}
              setEmail={setEmail} // Pass setEmail to LogIn
            />
          )}
          <div className="text-sm text-purple-600 mt-0 mx-auto">
            {isSignUp ? (
              <>
                <span>Already have an account? </span>
                <button onClick={toggleSignUp} className="underline">
                  Log In
                </button>
              </>
            ) : (
              <>
                <span>Don't have an account? </span>
                <button onClick={toggleSignUp} className="underline">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
