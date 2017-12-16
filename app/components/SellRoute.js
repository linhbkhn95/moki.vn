import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
var store = require('app/store.js');

// import {loadMenu,resetMenu} from 'actionMenu';

//import {login,logout}  from 'app/action/actionAuthenticate.js';


// var store = require('store');
console.log('const PrivateRoute = ({ component: Component, ...rest }) =>(');

//console.log(store.getState());
const PrivateRoute = ({ component: Component, ...rest }) => {
  
  let state = store.getState();
  return (

    <Route {...rest} render={props => (

      localStorage.jwToken&&state.auth.isAuthenticated&&state.auth.user.type=="SELLER"? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
        )
    )} />
  )
}
module.exports =
  PrivateRoute
 // props.isAuthenticated
