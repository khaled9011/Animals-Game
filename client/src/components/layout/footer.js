import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div>
        <div className="bg-dark text-white card-footer text-center fixed-bottom">
          Animal Trivia &copy; {new Date().getFullYear()}
        </div>
      </div>
    );
  }
}
