import React, { useState, useEffect } from "react";
import SignUp from "../components/signUp";
import LogIn from "../components/logIn";

const Account = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Tracks whether to show sign-up or login form

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between sign up and login
  };

  useEffect(() => {
    // Check if there's a valid token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsUserLoggedIn(false);
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      {isUserLoggedIn ? (
        <div>
          <h1>Account Page</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          {isSignUp ? (
            <SignUp
              setAuthToken={setAuthToken}
              setIsUserLoggedIn={setIsUserLoggedIn}
            />
          ) : (
            <LogIn
              setAuthToken={setAuthToken}
              setIsUserLoggedIn={setIsUserLoggedIn}
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
