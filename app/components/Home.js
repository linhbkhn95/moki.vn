import React from 'react';
import {NavLink} from 'react-router-dom';

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import HomePage from './pages/home/components/HomePage.js';
import Layout from './pages/home/components/Layout.js';

var Login = require('app/components/pages/login/Login.js');
class Home extends React.Component{
 
  render(){
    var that =this;
    return(
       
          <Layout>
                    <Route exact path="/" component={HomePage} />
               
                   
          </Layout>
             
             
              
            
        
    )
  }
}
module.exports = connect(function(state){return{}})(Home);