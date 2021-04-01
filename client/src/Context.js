import React, {Component} from 'react';
import Data from './Data';
import Cookies from 'js-cookie';
const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };
  
  constructor() {
    super();
    //Allows us to access the helper class functions from Data.js
    this.data = new Data();
    
  }


  render() {
    const {authenticatedUser} = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      }
    }
    // wraps all of our components that call context into the component
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }

  // sign in method that pulls from the data class to make sure that the user exists in the data base
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        user.password = password
        return {
          authenticatedUser: user,
        };
      });
      //persisting user credentials via a short lived cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }
  // sign out method that sets the authenticated user state to null
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;


//Wraps a provided component in Context.Consumer component. Subscribes component to all actions/context changes
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}