import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class ChangePass extends React.Component{
  
   
    render(){
        return(
         
            
                   <div >
                        <div className="changepass-setting">
                        <div className="">
            <div className="noidung">
                <div className="headings-color padding-text" style={{marginTop: "10px"}}>
                    <h5>Đổi mật khẩu</h5>
                </div>
                <div className="content">
                    <form method="POST" className="form-validate ng-pristine ng-valid" id="changePassword" novalidate="novalidate">
                        <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Mật khẩu cũ</span></strong>
                        <p className="text-muted editable password">
                            <input type="password" name="oldPassword" id="oldPassword" className="form-control" maxlength="30" data-rule-required="true" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" aria-required="true"/>
                        </p>
                        <hr/>
                        <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Mật khẩu mới</span></strong>
                        <p className="text-muted editable password">
                            <input type="password" name="newPassword" id="newPassword" className="form-control" data-rule-required="true" maxlength="30" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" aria-required="true"/>
                        </p>
                        <hr/>
                        <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Nhập lại mật khẩu mới</span></strong>
                        <p className="text-muted editable password">
                            <input type="password" name="newPasswordConfirm" className="form-control" data-rule-required="true" maxlength="30" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" data-rule-equalto="#newPassword" data-msg-equalto="Xác nhận mật khẩu mới không đúng" aria-required="true"/>
                        </p>
                        <hr/>
                        <button type="submit" className="btn btn-block update_profile"><b>Lưu lại</b></button>
                    </form>
                </div>
            </div>
        </div>
                       
                        
                     
                    </div>
           </div>
            
               
            
        )
    }
}

module.exports = ChangePass;
