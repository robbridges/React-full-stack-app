import React, { Component, } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const {context} = this.props;
    const authorizedUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href='/'>Courses</a></h1>
          <nav>
            {authorizedUser ?
              <React.Fragment>
                <ul className="header--signedin">
                  <span>Welcome, {authorizedUser.firstName} {authorizedUser.lastName} </span>
                  <Link to="/signout">Sign Out</Link>
                </ul>
              </React.Fragment>
              :
              <React.Fragment>
                <ul className="header--signedout">
                  <li><Link to='/signup'>Sign Up</Link></li>
                  <li><Link to='/signin'>Sign In</Link></li>
                </ul>
              </React.Fragment>
            }
          </nav>
        </div>
      </header>
    )
  }
}