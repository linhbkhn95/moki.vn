import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {removeCart} from 'app/action/actionShoppingCart';
class Layout extends React.Component{
  
   
    render(){
        return(
              <section>
                <div className="manager-user-shopcart">
                    <div className="container conetent-manager">
                        <div className="row">

                            <div className="col-md-3">
                                  <div className="menu-manager">
                                     <div className="headings">
                                        <h5 style={{fontWeight:"bold"}}>Tài khoản của bạn</h5>
                                      </div>

                                  
                                    <div className="content-menu">
                                         <ul>
                                            <li><Link to="/user_shop/manager/accountsetting" className="">Quản lý tài khoản</Link></li>
                                            <li><Link to="/user_shop/manager/order" className="active">Đơn hàng của tôi</Link></li>
                                            <li><Link to="/user_shop/manager/addresssetting" className="">Sổ địa chỉ</Link></li>
                                            <li><Link to="/user_shop/manager/accountinf" className="">Thông tin tài khoản</Link></li>
                                            <li><Link to="/user_shop/manager/changepass" className="">Đổi mật khẩu</Link></li>
                                            <li><Link to="/ShoppingCarts/address_book" className="">Danh sách chặn</Link></li>
                                        </ul>
                                        <img src="/../../images/banner/Layer 32.png" alt="" />
                                        <div className="download">
                                                <a href="http://bit.ly/moki_ios"><img src="/../../images/banner/appstore130.png" alt=""/></a>
                                                <a href="http://bit.ly/moki_android"><img src="/../../images/banner/chplay130.png" alt=""/></a>
                                                <a href="https://www.microsoft.com/vi-vn/store/p/moki-mua-ban-tren-di-%C4%90ong-cho-me-va-be/9nblggh4wz0j"><img src="/../../images/banner/windowphone130.png" alt=""/></a>
                                            </div>
                                       </div>








                                  </div>
                            </div>
                            <div className="col-md-9">
                                  
                                      {this.props.children}
                                  
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        )
    }
}

module.exports = Layout;
