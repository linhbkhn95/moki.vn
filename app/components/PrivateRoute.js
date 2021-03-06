import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
var store = require('app/store.js');

// import {loadMenu,resetMenu} from 'actionMenu';

//import {login,logout}  from 'app/action/actionAuthenticate.js';



console.log('const PrivateRoute = ({ component: Component, ...rest }) =>(');


const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Route {...rest} render={props => {
      return (
        localStorage.jwToken ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
          )
      )
    }} />
  )
}
module.exports =
  PrivateRoute
 // props.isAuthenticated
