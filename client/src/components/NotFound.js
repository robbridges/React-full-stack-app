import React from 'react';
// simple not found, used mostly if user manually enters bad input into the url, as our app should handle all correct requests
function NotFound( ) {
  return (
    <div className="wrap">
      <h1> Not found</h1>
      <p> Sorry we couldn't find the page that you're looking for.</p>

    </div>
  )
}

export default NotFound;