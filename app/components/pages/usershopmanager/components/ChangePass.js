import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class ChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let validate = $("#change-password").validate();
    }
    changePassword() {
        console.log("Change PAsss ")

        let oldPassword = document.getElementById("oldPassword").value;
        let newPassword = document.getElementById("newPassword").value;
        let newPasswordConfirm = document.getElementById("newPasswordConfirm").value;
        let validate = $("#change-password").validate();
        console.log(oldPassword, newPassword, newPasswordConfirm, !Object.keys(validate.invalid).length)

        if(!Object.keys(validate.invalid).length) {
            axios.post('/api/change_password', {
                old_password: oldPassword,
                new_password: newPassword
            })
            .then((res) => {
                if (res.data.code == 1000) {
                    alert("Thay đổi mật khẩu thành công")
                    document.getElementById("oldPassword").value = "";
                    document.getElementById("newPassword").value = "";
                    document.getElementById("newPasswordConfirm").value = "";
                } else {
                    alert("Sai mật khẩu cũ")
                }
            })
        }
    }

    render() {
        return (
            <div >
                <div className="changepass-setting">
                    <form id="change-password">
                        <div className="noidung">
                            <div className="headings-color padding-text" style={{ marginTop: "10px" }}>
                                <h5>Đổi mật khẩu</h5>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <div className="form-validate ng-pristine ng-valid" id="changePassword">
                                    <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Mật khẩu cũ</span></strong>
                                    <p className="text-muted editable password">
                                        <input type="password" name="oldPassword" id="oldPassword" className="form-control" maxLength="30" data-rule-required="true" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" aria-required="true" />
                                    </p>
                                    <hr />
                                    <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Mật khẩu mới</span></strong>
                                    <p className="text-muted editable password">
                                        <input type="password" id="newPassword" className="form-control" data-rule-required="true" maxLength="30" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" aria-required="true" />
                                    </p>
                                    <hr />
                                    <strong><i className="fa fa-unlock-alt margin-r-5"></i> <span>Nhập lại mật khẩu mới</span></strong>
                                    <p className="text-muted editable password">
                                        <input type="password" id="newPasswordConfirm" className="form-control" data-rule-required="true" maxLength="30" data-msg-required="Vui lòng nhập mật khẩu" data-rule-lettersonly="true" data-msg-lettersonly="Vui lòng chỉ nhập chữ và số !" data-rule-minlength="6" data-msg-minlength="Mật khẩu tối thiểu 6 ký tự" data-rule-maxlength="30" data-msg-maxlength="Mật khẩu tối đa 30 ký tự" data-rule-equalto="#newPassword" data-msg-equalto="Xác nhận mật khẩu mới không đúng" aria-required="true" />
                                    </p>
                                    <hr />
                                    <button type="button" onClick={this.changePassword.bind(this)} className="btn btn-block update_profile"><b>Lưu lại</b></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
}

module.exports = ChangePass;
