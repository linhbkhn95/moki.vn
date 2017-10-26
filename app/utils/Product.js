import React from 'react';
import {NavLink} from 'react-router-dom';

class Product extends React.Component{
    render(){
      return(
          <div className="product ">
              <div className="img-product"> 
                  <NavLink to={"/product/"+ this.props.productId}><img src={this.props.src} /></NavLink>
             </div>
             <div className="name-product">
                  <a href="">{this.props.name} </a>
             </div>
             
             <div className="vote">
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             </div>
              <div className="price-product">
                  <div className="price-sale">{this.props.priceSale}</div>
                  <div className="price-pre">{this.props.pre}</div>
              </div> 
            </div>
       
      )
    }
  }

  module.exports = Product;