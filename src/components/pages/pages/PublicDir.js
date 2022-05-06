import React from 'react';
import {
  Route,
  BrowserRouter as 
  Redirect,
} from "react-router-dom";


function PublicDir({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/home' />
        }
    />
  )
}

export default PublicDir;