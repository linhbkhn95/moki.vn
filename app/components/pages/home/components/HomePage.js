import React from 'react';
import {NavLink} from 'react-router-dom';
import Slider from'react-slick';

import SlideProduct from './SlideProduct.js';

var url=["https://moki.vn/files/banner/banner_1497926374_35.png","https://moki.vn//files/banner/banner_1507083436_36.png"]
class Home extends React.Component{
  constructor(props){
      super(props);
      this.state={
         url_banner:"https://moki.vn/files/banner/banner_1497926374_35.png"
      }
  }
  componentDidMount(){
    // var that=this;
    // var i =1;
    //  setInterval(function(){
        
    //     that.setState({url_banner:url[i%2]});
    //     i++;
    //  },10000);
  }
  render(){
    var that =this;
   
    return(
     
          
              <div className="col-md-9 right">
                <img className="banner"  src={this.state.url_banner} alt=""/>
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
