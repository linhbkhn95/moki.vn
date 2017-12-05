import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

class Product extends React.Component{
   
    like(){
       var {auth} = this.props;
       if(!auth.isAuthenticated){
        this.context.router.history.push('/user/login');
       }
       else{
          console.log('like');
       }
    }
    render(){
      return(
          <div className="product ">
              <div className="img-product"> 
                  <NavLink to={"/category/product/"+this.props.name.split(' ').join('-')+"--"+ this.props.productId+".html"}><img style={{width:"100%",height:"400px"}} src={this.props.src} /></NavLink>
             </div>
             <div className="name-product">
                  <a href="">{this.props.name} </a>
             </div>
             
             <div className="vote">
             {/* <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i> */}
              <div className="like-product">
                {this.props.like} <i onClick={this.like.bind(this)} style={{fontWeight:this.props.is_liked? "bold":"",cursor:"pointer",fontSize:"20px"}} className="fa fa-heart-o" aria-hidden="true"> </i><i style={{fontSize:"20px"}}  className="fa fa-comment-o icon-comment" aria-hidden="true"></i><i style={{fontSize:"13px"}}>{this.props.comment}</i>
              </div>
             </div>
              <div className="price-product">
                  <div className="price-sale">{this.props.priceSale}</div>
                  <div className="price-pre">{this.props.pre}</div>
              </div> 
             
            </div>
       
      )
    }
  }

  Product.contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  module.exports = connect(function(state){
    return{
      auth:state.auth
  }})(Product);