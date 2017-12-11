import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { setAddress } from 'app/action/actionStepOrder.js';

class StepAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			display: 'none'
		}
	}
	onSiteChanged(e) {
		this.setState({
			display: 'block'
		});
	}
	onAddressChanged(e) {
		this.setState({

			display: "none"
		});
	}
	nextStep() {
		var { dispatch } = this.props

		let _choose = Array.from(document.getElementsByName("site_name")).find((radio) => {
			return radio.checked
		})
		let address;
		switch (_choose.id) {
			case "address-default":
				address = _choose.value;
				break;
			case "address-orther":
				address = document.getElementById("value-address-orther").value;
				break;
		}

		if (!address) {
			alert("Vui lòng nhập địa chỉ");
		}

		dispatch(setAddress(address))
		this.props.history.push('/user/order/step/order_info')
	}

	componentWillReceiveProps(nextProps) {
		var that = this;

		axios.post('/api/get_user_info')
			.then(function (res) {
				let data = res.data.data;
				that.setState({ user: data });
			})
	}
	componentDidMount() {
		var that = this;

		axios.post('/api/get_user_info')
			.then(function (res) {
				let data = res.data.data;
				that.setState({ user: data });
			})
	}

	render() {
		console.log("step address", this)
		return (
			<div className="background-cart">
				<div className="checkout">
					<div className="container">
						<div className='col-md-8 col-md-offset-2'>
							<div className="checkout_info_price" style={{ paddingTop: '10px' }}>
								<div className="headings">
									<h5>Xin vui lòng chọn địa chỉ để nhận hàng</h5>
								</div>
								<form action="/ShoppingCarts/checkout" className="form-horizontal ng-pristine ng-valid" id="addressForm" method="post"><div style={{ display: "none" }}><input type="hidden" name="_method" value="POST" /></div>					<div className="content" style={{ marginTop: "0px" }}>
									<div className="radio" style={{ padding: "10px" }}>
										<label>
											<input onChange={this.onAddressChanged.bind(this)} id="address-default" type="radio" name="site_name" value={[this.state.user.address, this.state.user.city].join(", ")} />
											{[this.state.user.address, this.state.user.city].join(", ")}
										</label>
									</div>
									<div className="radio" style={{
										border: "1px solid #f2f2f2", backgroundColor: "#fffef1"
										, padding: "10px"
									}}>
										<label><input type="radio" name="site_name"
											id="address-orther"
											onChange={this.onSiteChanged.bind(this)} />Thêm địa chỉ khác</label>

									</div>
									<div style={{ display: this.state.display }} className="newAddress">
										<div className="form-group">
											<label className="col-sm-2 control-label">Địa chỉ</label>
											<div className="col-sm-10">
												<input type="text" className="form-control" id="value-address-orther" name="addressOrther" placeholder="Tỉnh, Huyện(Quận), Xã(Phường), Số nhà, Xóm, Tổ, Đường ..v.v.." />
											</div>
										</div>
									</div>
									<div className="form-group hidden-xs">
										<div className="col-sm-6">
											<button type="button" onClick={this.nextStep.bind(this)} className="btn btn-default text-righ">Tiếp tục</button>
										</div>
									</div>

								</div></form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = connect(function (state) { return { stepOrder: state.stepOrder } })(StepAddress);