import React, {Component} from 'react';
import Data from './Data';
const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    //Allows us to access the helper class functions from Data.js
    this.data = new Data();
    
  }


  render() {
    const value = {
      data: this.data,
      actions: {
        signIn: this.signIn,
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        }
      });
    }
    return user;
  }
}



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