import React from "react";
import Router from "next/router";

const Login = () => {
  return (
    <div className="auth-container">
      <h1 className="auth-title">CoffeeChatr</h1>
      <div>
        <button
          className="auth-btn login-btn mx-4"
          onClick={() => Router.push("/api/auth/login")}
        >
          Log In
        </button>
        <button
          className="auth-btn mx-4"
          onClick={() => Router.push("/api/auth/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
