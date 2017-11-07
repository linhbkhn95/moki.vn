import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class AddressSetting extends React.Component{
  
   
    render(){
        return(
         
             <div className="address-setting" >
                  
              <div className="col-md-9 col-sm-12">
                    <div className="noidung">
                        <div className="headings">
                            <h5>Quản lý địa chỉ</h5>
                        </div>

                        <div className="content_adress">
                            <div className="headdings">
                                <h6>Sổ địa chỉ</h6>
                                <a className="btn" href="/ShoppingCarts/add_address">
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Thêm địa chỉ
                                </a>
                            </div>
                            <div className="list-adress">
                                                                                                    <div className="col-md-6 item">
                                            <div className="contentt">
                                                <p className="name">Trịnh đức Bảo Linh </p>
                                                <p className="address truncated" value="3646" data-city="1" data-province="1" data-ward="1" style={{wordWrap: "break-word"}}>aaa, Phường Lê Lợi, Thị Xã Sơn Tây, Hà Nội</p>
                                                <p className="phone">01689952267</p>
                                                <a href="/ShoppingCarts/edit_address/3646" className="btn edit">Sửa địa chỉ</a>                                            <a href="/ShoppingCarts/delete_address/3646" className="btn del">Xóa địa chỉ</a>                                        </div>
                                        </div>
                                                                                        </div>
                        </div>

                    </div>
        </div>
            
              </div> 
            
        )
    }
}

module.exports = AddressSetting;
