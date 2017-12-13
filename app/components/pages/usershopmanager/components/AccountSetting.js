import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
import axios from 'axios'
class AccountSetting extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			user: {

			}
        }
    }
	
    componentDidMount() {
		let that = this;
		axios.post('/api/get_user_info')
		.then(function (res) {
			let {code, message, data} = res.data;
			if(code == 1000) {
				that.setState({ user: data });
			}
		})
	}

	render() {
		console.log(this.state, this.props);
		return (
			<div className="account-setting">
				<div className="col-md-12 col-sm-12">
					<div className="noidung" style={{marginBottom: "50px"}}>
						<div className="headings color-heading">
							<h5>Quản lý tài khoản</h5>
						</div>
						<div className="headings-color padding-text" style={{ marginTop: '10px' }}>
							<h5>Thông tin tài khoản</h5>
						</div>
						<div style={{ marginTop: "15px", padding: "20px" }}>
							<div className="form-group">
								<Avatar src={this.state.user.avatar} size={150} />
							</div>
							<div className="form-group">
								<strong><i className="fa fa-user margin-r-5"></i>Tên người dùng</strong>
								<p className="text-muted editable username editable-click" data-inputclassName="username-input">{this.state.user.username}</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-user margin-r-5"></i>Giới tính</strong>
								<p className="text-muted" data-inputclassName="username-input">{this.state.user.gender}</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-envelope-o margin-r-5"></i>Email</strong>
								<p className="text-muted editable emails editable-click editable-empty" data-inputclassName="email-input">{this.state.user.email||"Chưa nhập email"}</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-user margin-r-5"></i>Địa chỉ</strong>
								<p className="text-muted editable username editable-click" data-inputclassName="username-input">{this.state.user.address||"Chưa nhập địa chỉ"}</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-phone margin-r-5"></i>Số điện thoại</strong>
								<p className="text-muted">{this.state.user.phone||"Chưa nhập số điện thoại"}</p>
							</div>
							<div className="form-group">
								<strong><i className="fa fa-unlock-alt margin-r-5"></i>Mật khẩu</strong>
								<p className="text-muted editable password">
									<Link to="/user_shop/manager/changepass" className="">(Thay đổi mật khẩu)</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = connect(function (state) { return { user: state.auth.user } })(AccountSetting);
