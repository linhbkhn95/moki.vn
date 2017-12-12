
import {NavLink,Link} from 'react-router-dom';
import React from 'react';
import {NavDropdown,MenuItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from 'app/action/actionUserName';
import ScrollToTop from 'react-scroll-up';
import {setCart} from 'app/action/actionShoppingCart';
import axios from 'axios';
import {setTitle}from 'app/action/actionTitlePage.js'

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
  class Nav extends React.Component {
  componentDidMount(){
    
      var that =this;
      // axios.post('/session/getCart')
      // .then(function(res){
      //     console.log('vao NNAv');
      //       if(res.data==="not cart")
      //          that.props.dispatch(setCart([]));
      //       else
               that.props.dispatch(setCart());
               this.props.dispatch(setTitle(" "))
      // })
      // .catch(function(e){
      //     console.log(e);
      // })
  }
  search(e){
    e.preventDefault();
    let key = this.refs.search.value;
    this.context.router.history.push('/products/search.'+key+'.html');
  }
  logout(){
    
       console.log("logout");
   
   

        
        var {dispatch,history} = this.props;
        //logoutUser.bind(this);
        // axios.post('/session/logOut')

        // .then(res => {
        //   if(res.data=="ok"){
        //     console.log('logOut');
      //    dispatch(logout());
          localStorage.removeItem('jwToken');
          dispatch(logout());
          // setAuthorizationToken(false);
          // dispatch(setCurrentUser({}));
          this.context.router.push('/');


         //   dispatch(resetMenu());
            // that.context.router.history.push('/login');
        //   }

        // })
        // .catch(err => console.log(err))
  }
   myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
          x.className += " responsive";
      } else {
          x.className = "topnav";
      }
  }
  render() {
    
    var html1 =  this.props.auth.isAuthenticated ?  <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img style={{width:"24px",marginRight:"4px"}} src={this.props.auth.user.avartar} />{this.props.auth.user.username}<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to="/user_shop/manager/accountsetting">Quản lý tài khoản</Link></li>
            <li><Link onClick={this.logout.bind(this)} to="">Đăng xuất</Link></li>
          
          </ul>
        </li> : <li>Chào mừng bạn đến với MOKI</li>
    var html2 = this.props.auth.isAuthenticated? null:  <li><Link to="/user/login">Đăng nhập</Link> /<Link to="/regester"> Đăng ký</Link></li>
    
    return (
         
          <header>
             
            <div className="header-top container">
              <div className="left">
                <p><span className="glyphicon glyphicon-earphone"></span> Hotline: <span>1900 636 779</span></p>
              </div>
              <div className="right">
                <ul className="topnav" id="myTopnav">
                <li><span className="menumb" id="menu-mobile" onClick={this.myFunction.bind(this)}>
                    <span className="icon">
                        <i className="fa fa-circle-thin" aria-hidden="true"></i>
                        <i className="fa fa-circle-thin" aria-hidden="true"></i>
                        <i className="fa fa-circle-thin" aria-hidden="true"></i>
                    </span> 
                </span></li>
                  {/* <li>Chào mừng bạn đến với MOKI</li> */}
                
                      {/* Trịnh đức Bảo Linh
                      <ul style={{display:"none"}}>
                          <li>quản lý đơn hàng</li>
                          <li>quản lý tài khoản</li>
                          <li>Đăng xuất</li>
                      </ul> */}
                      {/* <NavDropdown eventKey="4" title="Trịnh đức Bảo Linh" id="nav-dropdown">
                        <MenuItem eventKey="4.1"><Link to="">Quản lý đơn hàng</Link></MenuItem>
                        <MenuItem eventKey="4.2"><Link to="">Quản lý tài khoản</Link></MenuItem>
                        <MenuItem eventKey="4.3"><Link to="">Đăng xuất</Link></MenuItem>
                        
                      </NavDropdown> */}
                  {html1}
                     
                  {/* <li><Link to=""><i className="fa fa-flag-checkered" aria-hidden="true"></i>Kiểm tra đơn hàng</Link></li> */}
                  <li><NavLink to="/shopCart"><i className="fa fa-shopping-cart" ></i>Giỏ hàng</NavLink> <span className="badge">{this.props.count}</span></li>
                 {html2}
                </ul>
              </div>
            </div>
           

            <div className="menu">
              <div className="container">
                <div className="left">
                <img className="logo" src="../../images/logo_medium.png" alt="Moki.vn - Ứng dụng mua bán trên di động | "/>
                </div>
                <div className="right">
                  <div className="search">
                   <form onSubmit={this.search.bind(this)}> <input type="text"  ref="search" placeholder="Tìm kiếm sản phẩm.."/></form>
                  </div>
                  <div className="navbar">
                    <ul>
                      <li className="active"><Link to="/">TRANG CHỦ</Link></li>
                      
                      <li><Link to="/">SHOP MOKI</Link></li>
                      <li><a href=""><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                      <li><a href=""><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                      <li><a href=""><i className="fa fa-youtube" aria-hidden="true"></i></a></li>
                      <li><a href=""><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <ScrollToTop showUnder={160} style={{zIndex: "10000"}}>
             <img src="../images/up_arrow_round.png"/>
                                </ScrollToTop>

          </header>
     
          
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
}

 module.exports =connect(function(state){
   return{
       auth:state.auth,
   //    username:state.username,
       count :state.shoppingCart.count
   }})
  (Nav);