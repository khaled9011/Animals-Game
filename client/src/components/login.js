import React, { Component } from "react";

export default class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const user = new URLSearchParams();
    user.append("email", this.state.email);
    user.append("password", this.state.password);

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: user,
    })
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container forms ">
        <div className="row justify-content align-items-center">
          <div className="col-md-8 m-auto">
            <div className="landing-inner">
              <h1 className="text-center">Login</h1>
              <form onSubmit={this.submit} className="form-group">
                <div>
                  <label>Email : </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="JohnDoe@mail.com"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <label>Password : </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <div className="text-center">
                    <input
                      type="submit"
                      className="btn btn-light button-style"
                      value="Login"
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
