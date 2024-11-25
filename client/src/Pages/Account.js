import React from "react";
import SignUp from "../components/signUp";
import LogIn from "../components/logIn";

const Account = () => {
  const isUserLoggedIn = false;
  return (
    <>
      <div className="main-container">
        {isUserLoggedIn ? <h1>Account Page</h1> : <LogIn />}
      </div>
    </>
  );
};

export default Account;
