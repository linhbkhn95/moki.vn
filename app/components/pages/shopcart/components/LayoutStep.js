import React from 'react';
import {Link} from 'react-router-dom';
class Layout extends React.Component{
    render(){
        return(
             <section className="hidden-sm hidden-xs progressbar">
                <div className="reg-step">
                    <div className="container">
                       
                        <ul className="register-step active  ">
                            <li className="" data-target="step-1">
                                <span className="number">1. Đăng nhập</span>
                            </li>
                            <li data-target="step-2" className="current">
                                <Link to="/user/order/step/address">
                                    <span className="number">2. Chọn địa chỉ</span>
                                </Link>
                            </li>
                            <li data-target="step-3" className="">
                                <a href="/ShoppingCarts/payment">
                                    <span className="number">3. Thanh toán</span>
                                </a>
                            </li>
                            <li data-target="step-4" className="">
                                <a href="/ShoppingCarts/order_info">
                                    <span className="number">4. Xác nhận</span>
                                </a>
                            </li>
                            <li data-target="step-5" className="">
                                <span className="number">5. Hoàn thành</span>
                            </li>
                        </ul>
                     
                    </div>
                    <div className ="container">
                         <div className="col-md-12">
                             {this.props.children};
                         </div>
                    </div>
                </div>
            </section>
        )
    }
}
module.exports = Layout;