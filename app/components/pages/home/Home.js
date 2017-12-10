import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuCategory from './components/MenuCategory.js';
import SlideProduct from './components/SlideProduct.js';
import Slider from'react-slick';
import DetailProduct from 'app/utils/DetailProduct.js';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import HomePage from './components/HomePage.js';
import Category from './components/Category.js';
import CategoryCom from './components/CategoryCom.js';
import Layout from './components/Layout.js';

var Login = require('app/components/pages/login/Login.js');
class Home extends React.Component{
 
  render(){
    var that =this;
    return(
       
          <Layout>
              
                    <Route exact path="/category" component={HomePage} />
               
                    <Route exact  path="/category/group-product/:y--:d.html" component={Category} />
                    
                    <Route  path="/category/product/:x--:c.html" component={DetailProduct}/>
                    {/* <Route render={function(){
                          return <p> Danh mục không tồn tại</p>
                           }
                       } /> */}
             
          </Layout>
             
             
              
            
        
    )
  }
}
module.exports = connect(function(state){return{}})(Home);