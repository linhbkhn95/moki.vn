import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class AccountSetting extends React.Component{
  
   
    render(){
        return(
         
            
            <div className="account-setting">
                 <div className="col-md-9 col-sm-12">
				<div className="noidung">
					<div className="headings color-heading">
						<h5>Quản lý tài khoản</h5>
					</div>
					<div className="headings-color padding-text" style={{marginTop: '10px'}}>
						<h5>Thông tin tài khoản</h5>
					</div>
					<div className="content" style={{marginTop:"15px"}}>
						<form method="POST" enctype="multipart/form-data" id="form-change" className="ng-pristine ng-valid">
							<div className="form-group">
								<strong><i className="fa fa-phone margin-r-5"></i> Số điện thoại</strong>
								<p className="text-muted">0978334401</p>
							</div>
							<div className="form-group">
								<label for="Banner">Banner</label>								<br/>
								<img src="" style={{maxHeight:"100px"}} id="bannerweb"/>
								<div>
									<span className="btn btn-default btn-file">Chọn Ảnh <input type="file" id="filebanner" name="cover_image" accept="image/*"/></span>
									<br/>
									<label className="label label-info">Tỷ lệ ảnh: w:h = 512:200</label>
								</div>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-user margin-r-5"></i> Tên người dùng</strong>
								<p className="text-muted editable username editable-click" data-inputclassName="username-input">Đinh Thị Ngọc</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-envelope-o margin-r-5"></i> Email</strong>
								<p className="text-muted editable emails editable-click editable-empty" data-inputclassName="email-input">chưa nhập email</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-unlock-alt margin-r-5"></i> Mật khẩu</strong>
								<p className="text-muted editable password">
									<a href="/ShoppingCarts/change_password"><i>(Thay đổi mật khẩu)</i></a>
								</p>
							</div>
							<div className="form-group">
								<button type="submit" className="btn btn-block update_profile"><b>Lưu lại</b></button>
							</div>
						</form>
					</div>
				</div>
			</div>
                     
                    </div>
           
            
               
            
        )
    }
}

module.exports = AccountSetting;
