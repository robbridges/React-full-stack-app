import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
// user sign in form, it has data fed into it from context.js sign in method
export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {

        const {
            emailAddress,
            password,
            errors,
        } = this.state;


        return (
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    <Form
                        cancel={this.cancel}
                        submit={this.submit}
                        errors={errors}
                        submitButtonText="Sign In"
                        elements={() => (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
                    />
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </main>
        );
    }
    // on change listener, updates whatever we're changing in state
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });

    }
    // pulls the email and password from the form and compares it to the database. Returning successful
    submit = () => {
        const {context} = this.props;
        const {emailAddress, password} = this.state;
        context.actions.signIn(emailAddress, password)
    
          .then(user => {
            if (user === null) {
              this.setState(() => {
                return {errors: ['Sign-in was unsuccessful'] };
              });
            } else {
              this.props.history.push('/')
              console.log(`Sucesss ${emailAddress} is signed in`);
            }
          })
          .catch( err => {
            console.log(err);
            this.props.history.push('/error');
            
          })
      }
      
      // simply returns user back to the main index
      cancel = () => {
        this.props.history.push('/');
      }
  }