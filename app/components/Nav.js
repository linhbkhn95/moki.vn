
import {NavLink,Link} from 'react-router-dom';
import React from 'react';
import {NavDropdown,MenuItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from 'app/action/actionUserName';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
  class Nav extends React.Component {
  logout(){
    var {dispatch} = this.props;

    console.log("logout");
    dispatch(logout());
    this.context.router.push('/');
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
    
    var html1 =  this.props.sdt ?  <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Trịnh đức Bảo Linh <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to="/login">Quản lý đơn hàng</Link></li>
            <li><Link to="">Quản lý tài khoản</Link></li>
            <li><Link onClick={this.logout.bind(this)} to="">Đăng xuất</Link></li>
          
          </ul>
        </li> : <li>Chào mừng bạn đến với MOKI</li>
    var html2 = this.props.sdt? null:  <li><Link to="/user/login">Đăng nhập</Link> /<Link to="/regester"> Đăng ký</Link></li>
    
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
                     
                  <li><Link to=""><i className="fa fa-flag-checkered" aria-hidden="true"></i>Kiểm tra đơn hàng</Link></li>
                  <li><NavLink to="/shopCart"><i className="fa fa-shopping-cart" ></i>Giỏ hàng</NavLink> <span className="badge">4</span></li>
                 {html2}
                </ul>
              </div>
            </div>
           

            <div className="menu">
              <div className="container">
                <div className="left">
                <img className="logo" src="../images/logo_medium.png" alt="Moki.vn - Ứng dụng mua bán trên di động | "/>
                </div>
                <div className="right">
                  <div className="search">
                    <input type="text" name="search" placeholder="Tìm kiếm sản phẩm.."/>
                  </div>
                  <div className="navbar">
                    <ul>
                      <li className="active"><Link to="/">TRANG CHỦ</Link></li>
                      <li><Link to="/">GÓC CỦA MẸ</Link></li>
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


          </header>
     
          
    );
  }
}


 module.exports =connect(function(state){
   return{
       sdt:state.username
   }})
  (Nav);