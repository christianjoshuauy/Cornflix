import React, { useState } from "react";
import "./Auth.scss";
import Login from "../../components/Login/Login";
import CornflixLogo from "../../imgs/Cornflix.png";
import { Link } from "react-router-dom";
import Signup from "../../components/Signup/Signup";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  const handleToggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="Auth">
      <div className="Auth__darkLayer" />
      <div
        className="Auth__background"
        style={{
          backgroundImage:
            "url(https://assets.nflxext.com/ffe/siteui/vlv3/76c10fc9-7ccd-4fbf-bc59-f16a468921ca/794eae7a-c7f8-4941-ba39-bc9dd003b28a/PH-en-20230529-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
        }}
      />
      <Link to="/" className="Auth__logo">
        <img
          className="Auth__logo--img"
          src={CornflixLogo}
          alt="CornflixLogo"
        />
      </Link>
      <div className="Auth__content">
        <h2 className="Auth__content--title">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        {isSignup ? <Signup /> : <Login />}
        <hr className="Auth__content--divider" />
        <div className="Auth__content--toggle">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={handleToggleSignup} className="toggler">
            {isSignup ? "Log In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Auth;
