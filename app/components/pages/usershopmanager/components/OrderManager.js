import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class Order extends React.Component{
  
   
    render(){
        return(
         
            
                   <div>
                        <div className="order">
                            <div className="headings">
                            <h5 style={{fontWeight:"bold"}}>Đơn hàng của tôi</h5>
                            </div>
                            <div className="tabsbutton">
                                    <ul> 
                                    <li className="active">
                                            <Link to="/user_shop/manager/order/process">Đang xử lý</Link>
                                        </li>
                                        <li className="">
                                            <Link to="/user_shop/manager/order/success">Hoàn thành</Link>
                                        </li>
                                        <li className="">
                                            <Link to="/user_shop/manager/order/fail">Đã hủy</Link>
                                        </li>
                                    </ul>
                            </div>
                            
                        </div>
                        <div style={{paddingTop:"15px"}}> 
                            <Route exact path="/user_shop/manager/order" component={OrderProcess} />
                            <Route       path="/user_shop/manager/order/process" component={OrderProcess} />
                            <Route       path="/user_shop/manager/order/success" component={OrderSuccess} />
                            <Route       path="/user_shop/manager/order/fail" component={OrderFail} />
                        </div>
                    </div>
           
            
               
            
        )
    }
}

module.exports = Order;
