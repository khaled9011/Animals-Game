import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-dark bg-dark ">
          <Link to="/" className="navbar-brand">
            Animal Trivia Game
          </Link>
        </nav>
      </div>
    );
  }
}
