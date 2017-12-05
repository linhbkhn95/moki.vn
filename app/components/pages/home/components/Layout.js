import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuCategory from './MenuCategory.js';

import LayoutMain from 'app/components/Layout.js';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {connect}from 'react-redux'

class Layout extends React.Component{
  constructor(props){
    super(props);
    this.state={
         titlePage:''
    }
  }
  render(){
    var that =this;
    return(
       <LayoutMain>
          <div>
        
          <div className="container">
           <div className="title-group-product"> <h2>{this.props.titlePage?this.props.titlePage.toUpperCase():""}</h2> <hr /> </div>
            <div className="row">

              <div className="col-md-3 left">
              
                  <MenuCategory />
                  <img className="banner" src="../../images/caidatmoki.jpg" alt=""/>
              </div>
             
             {this.props.children}
           
              
            
            </div>
        </div>
        </div>
      </LayoutMain>
    )
  }
}
module.exports =  connect(function(state){return{
  titlePage:state.titlePage}
})(Layout);
