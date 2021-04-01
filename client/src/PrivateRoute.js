import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';
// a private route much like regular route but requires an authenticated user, if no user redirects to sign in page
function PrivateRoute ({ component: Component, ...rest }) {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
}

export default PrivateRoute;