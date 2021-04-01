import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
// user sign up page, creates a user in the database and adds that to the current state of the app
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
  // on change event that updates any values in state upon their change
  change = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      this.setState(() => {
          return {
              [name]: value
          };
      });
  }

  submit = () => {
      const {context} = this.props;
      
      const {
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
      } = this.state;

      const user ={
          firstName,
          lastName,
          emailAddress,
          password,
          confirmPassword,
      };

      context.data.createUser(user)
        .then(errors => {
            if (errors.length) {
                this.setState(({errors}));
            } else {
                console.log(`${emailAddress} is successully signed up`)
            }
        })
        .catch( err => {
            console.log(err);
            this.props.history.push('/error');
        })
  }
  // cancel button simply sends user back to the main course index
  cancel = () => {
      this.props.history.push('/');
  }


}