import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errors: []
  }

  render() {
      const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
          errors,
      } = this.state;

      return (
          <main>
              <div className="form--centered">
                  <h2>Sign Up</h2>
                  <Form
                      cancel={this.cancel}
                      submit={this.submit}
                      errors={errors}
                      submitButtonText="Sign Up"
                      elements={() => (
                          <React.Fragment>
                              <label htmlFor="firstName">
                                  First Name
                              </label>
                              <input
                                  id="firstName"
                                  name="firstName"
                                  type="text"
                                  value={firstName}
                                  onChange={this.change}
                              />
                              <label htmlFor="lastName">
                                  Last Name
                              </label>
                              <input
                                  id="lastName"
                                  name="lastName"
                                  type="text"
                                  value={lastName}
                                  onChange={this.change}
                              />
                              <label htmlFor="emailAddress">
                                  Email Address
                                  </label>
                              <input
                                  id="emailAddress"
                                  name="emailAddress"
                                  type="email"
                                  value={emailAddress}
                                  onChange={this.change}
                              />
                              <label htmlFor="password">
                                  Password
                                  </label>
                              <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  value={password}
                                  onChange={this.change}
                              />
                              <label htmlFor="confirmPassword">
                                  Confirm Password
                              </label>
                              <input
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={this.change}
                              />
                          </React.Fragment>
                      )}
                  />
                  <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
              </div>
          </main>
      );
  } 

  change = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState(() => {
          return {
              [name]: value
          };
      });
  }


}