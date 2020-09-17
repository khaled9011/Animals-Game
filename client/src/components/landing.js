import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="text-center landing-inner text-white">
          <h1 className="title-Landing">Welcome to the Animal Trivia !</h1>
          <Link to="/signup" className="btn btn-dark button-style">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-light button-style">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
