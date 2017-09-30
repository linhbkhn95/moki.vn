import React from 'react';
import {NavLink} from 'react-router-dom';
import Slider from'react-slick';

import SlideProduct from './SlideProduct.js';

class Home extends React.Component{
 
  render(){
    var that =this;
    console.log('homepage');
    return(
     
          
              <div className="col-md-9 right">
                <img className="banner"  src="https://moki.vn/files/banner/banner_1497926374_35.png" alt=""/>
                <div className="row group_banner">
                  <div className="col-md-6">
                      <a href=""><img className="banner " src="../../images/lamsaodemuahang.jpeg" alt=""/></a>
                  </div>
                  <div className="col-md-6">
                      <a href="" ><img className="banner" src="../../images/bikip.jpg" alt=""/></a>
                  </div>

                </div>
                <div className="clearfix"></div>
                <SlideProduct />
            </div>
            
          
     
    )
  }
}
module.exports =  Home;
