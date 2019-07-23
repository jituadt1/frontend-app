import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import axios from "axios";
import { validateAllField, validateProperty } from "../validate";
import config from "../../API/config.json";
import "./ForgotPassword.scss";

import { join } from "@redux-saga/core/effects";

class ForgotPassword extends Component {
  state = {
    account: { email: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email")
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = validateProperty(input, this.schema);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const errors = validateAllField(this.state.account, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;

    const account = { ...this.state.account };
    const { data } = await axios.post(config.forgotPasswordAPI, account);
    console.log(data);
    this.props.history.push("/");
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="signin-container">
        <div>
          <form onSubmit={this.handleSubmit}>
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
            <div>
              <button
                type="submit"
                name="signIn"
                className=" btn btn-info fogotpwd btn"
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
        <div className="signup-options-container">
          <NavLink to="/signIn" className="signup-link">
            Sign In
          </NavLink>
          <NavLink to="/signUp" className="forgot-password-link">
            Sign Up
          </NavLink>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
