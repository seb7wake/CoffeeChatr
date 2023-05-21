import React from "react";

const SignOn = () => {
  return (
    <div>
      <h1>CoffeeChatr</h1>
      <a className="auth-button-text" href="/api/auth/login">
        <button className="auth-button">Log In</button>
      </a>
      <a className="auth-button-text" href="/api/auth/signup">
        <button className="auth-button">Sign up</button>
      </a>
    </div>
  );
};

export default SignOn;
