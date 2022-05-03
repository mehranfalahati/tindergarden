import {auth} from '../Firebase/firebase'
import React from 'react';
import { getCurrentUser } from './Users/auth';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

function PrivateDir({ component: Component, authenticated, ...rest }) {
   
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname:'/login', state: {from: props.location} }}/>
        }
    />
  )
}

export default PrivateDir;
