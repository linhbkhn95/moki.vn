
import {NavLink,Link} from 'react-router-dom';
import React from 'react';

import PropTypes from 'prop-types';


  class Nav extends React.Component {

   myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
          x.className += " responsive";
      } else {
          x.className = "topnav";
      }
  }
  render() {

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
                  <li>Chào mừng bạn đến với MOKI</li>
                  <li><a href=""><i className="fa fa-flag-checkered" aria-hidden="true"></i> Kiểm tra đơn hàng</a></li>
                  <li><a href=""><i className="fa fa-shopping-cart" aria-hidden="true"></i>Giỏ hàng</a></li>
                  <li><a href="">Đăng nhập</a> /<a href=""> Đăng ký</a></li>
                
                </ul>
              </div>
            </div>
           

            <div className="menu">
              <div className="container">
                <div className="left">
                <img className="logo" src="./images/logo_medium.png" alt="Moki.vn - Ứng dụng mua bán trên di động | "/>
                </div>
                <div className="right">
                  <div className="search">
                    <input type="text" name="search" placeholder="Tìm kiếm sản phẩm.."/>
                  </div>
                  <div className="navbar">
                    <ul>
                      <li className="active"><a href="">TRANG CHỦ</a></li>
                      <li><a href="">GÓC CỦA MẸ</a></li>
                      <li><a href="">GIỚI THIỆU</a></li>
                      <li><a href="">SHOP MOKI</a></li>
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


 module.exports =Nav