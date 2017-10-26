import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuCategory from './components/MenuCategory.js';
import SlideProduct from './components/SlideProduct.js';
import Slider from'react-slick';
import DetailProduct from 'app/utils/DetailProduct.js';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';

import HomePage from './components/HomePage.js';
import Category from './components/Category.js';

var Login = require('app/components/pages/login/Login.js');
class Home extends React.Component{
 
  render(){
    var that =this;
    return(
        <Router>
          <div>
        
          <div className="container">
           <div className="title-group-product"> <h2>Miễn phí</h2> <hr /> </div>
            <div className="row">

              <div className="col-md-3 left">
              
                  <MenuCategory />
                  <img className="banner" src="../../images/caidatmoki.jpg" alt=""/>
              </div>
             
              {/* <Switch> */}
                    <Route exact path="/" component={HomePage} />
               
                    <Route   path="/:d" component={Category} />
                    
                    {/* <Route exact path="/product/:item" component={DetailProduct}/> */}
                    {/* <Route render={function(){
                          return <p> not dâ found</p>
                           }
                       } />  */}
                   {/* <Route path="/detail/:d" component={DetailProduct} /> */}
              {/* </Switch> */}
           
              
            
            </div>
        </div>
        </div>
       </Router> 
    )
  }
}
module.exports =  Home;
