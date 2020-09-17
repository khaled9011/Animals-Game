import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const newUser = new URLSearchParams();
    newUser.append("name", this.state.name);
    newUser.append("email", this.state.email);
    newUser.append("password", this.state.password);
    newUser.append("password2", this.state.password2);

    axios
      .post("/users/new", newUser, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log("Success ", res.data);
      })
      .catch((err) => {
        this.setState({ errors: err.response.data });
        console.log(this.state.errors);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container forms ">
        <div className="row justify-content align-items-center">
          <div className="col-md-8 m-auto">
            <div className="landing-inner">
              <h1 className="text-center">Sign Up</h1>
              <form onSubmit={this.submit} className="form-group">
                <div>
                  <p className="lead text-center">
                    Create an Account and play the Trivia!
                  </p>
                  <label>Name : </label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.name,
                    })}
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                  <label>Email : </label>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.email,
                    })}
                    name="email"
                    placeholder="JohnDoe@mail.com"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <label>Password : </label>
                  <input
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  <label>Repeat your Password : </label>
                  <input
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password2,
                    })}
                    name="password2"
                    placeholder="Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                  <div className="text-center">
                    <input
                      value="Join the Trivia"
                      className="btn btn-light button-style"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
