import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser"; //we are using Joi for validations
import axios from "axios"; //we are using axios library for API calls
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import SignIn from "../SignIn/SignIn";
import "./SignUp.scss";
import { validateAllField, validateProperty } from "../validate";
import config from "../../API/config.json"; //API urls

class SignUp extends Component {
  state = {
    account: { code: "", password: "", username: "", email: "" }, //we will set this values dynamically
    errors: {} //for now errors are empty, we will set errors dynamically
  };

  //this schema helps user to contruct strong password and username
  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Password")
      .label("Username"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    code: Joi.string().label("Referral Code")
  };

  //this function validates fields dynamically as user enters values
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = validateProperty(input, this.schema); //validate each field dynamically
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  //when user clicks on signup button this function will be called
  handleSubmit = async e => {
    e.preventDefault();
    const errors = validateAllField(this.state.account, this.schema); //validation all fields
    this.setState({ errors: errors || {} }); //errors object will be set if there is any
    if (errors) return;

    try {
      const account = { ...this.state.account };
      const { data } = await axios.post(config.signUpAPI, account); //Singup API call to backend server
      // console.log(data);
      this.props.history.push("/"); //Redirection to SignIn page
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.errors };
        error.code = "Invalid referral code"; //user needs a valid referral code to sign up as per backend behavior
        this.setState({ errors: error });
      } else {
        console.log("Logging the error", ex);
        alert("An unexpected error occurred.");
      }
    }
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="signin-container">
        <div>
          <form onSubmit={this.handleSubmit} action={SignIn}>
            <div className="form-group">
              <input
                value={account.username}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
              />
              {errors.username && ( //shows error below each field
                <div className="alert alert-danger">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <input
                value={account.password}
                onChange={this.handleChange}
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="alert alert-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <input
                value={account.email}
                onChange={this.handleChange}
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
              />
              {errors.email && (
                <div className="alert alert-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                value={account.code}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="code"
                placeholder="Referral code"
              />
              {errors.code && (
                <div className="alert alert-danger">{errors.code}</div>
              )}
            </div>
            <div>
              <button type="submit" className=" btn btn-info signup-btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="signup-options-container">
          <NavLink to="/signIn" className="signup-link">
            Sign In
          </NavLink>
          <NavLink to="/forgotpassword" className="forgot-password-link">
            Forgot
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SignUp;
