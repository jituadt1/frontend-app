import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser"; //we are using Joi for validations
import axios from "axios"; //we are using axios library for API calls

import { fetchToken } from "../../actions/signInActions";
import { setToken } from "../../sagas/signInSaga";
import { validateAllField, validateProperty } from "../validate";
import config from "../../API/config.json"; //API urls

import "./SignIn.scss";

class SignIn extends Component {
  state = {
    account: { username: "", password: "" }, //we will set this values dynamically
    errors: {} //for now errors are empty, we will set errors dynamically
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
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

  //when user clicks on signin button this function will be called
  handleLogin = async e => {
    e.preventDefault();
    const errors = validateAllField(this.state.account, this.schema); //validation all fields
    this.setState({ errors: errors || {} }); //errors object will be set if there is any
    if (errors) return;

    try {
      const account = { ...this.state.account };
      const { data } = await axios.post(config.signInAPI, account); //Singin API call to backend server
      // console.log(account);
      {
        data && setToken();
      }
      this.props.history.push("/dashboard"); //Redirection to SignIn page
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.errors };
        error.username = "Invalid username or password.";
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
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <input
                value={account.username}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
              />
              {errors.username && ( //shows error below field
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
            <div>
              <button
                type="submit"
                name="signIn"
                className="btn btn-info signin-btn"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="signup-options-container">
          <NavLink to="/signup" className="signup-link">
            Sign Up
          </NavLink>
          <NavLink to="/forgotpassword" className="forgot-password-link">
            Forgot
          </NavLink>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    UserStore: state.UserStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchToken
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
