import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class StepSuccess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

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

	componentWillReceiveProps(nextStop) {
		if(!nextStop.stepOrder || nextStop.stepOrder.current!==4) {
			this.props.history.push('/')
		}
    }
    componentDidMount() {
		if(!this.props.stepOrder || this.props.stepOrder.current!==4) {
			this.props.history.push('/')
		}
	}
	render() {
		return (
			<div className="background-cart">
				<div className="checkout">
					<div className="container">
						<div className='col-md-8 col-md-offset-2'>
							<div className="checkout_info_price" style={{ paddingTop: '10px' }}>
								<div className="headings">
									<h4>Chúc mừng bạn đã đặt hàng thành công</h4>
									<hr />
									Bạn có thể xem đơn hàng vừa đặt tại <NavLink to={`/user_shop/manager/order.html`}>&quot;Quản lý đơn hàng&quot;</NavLink>

									<div style={{ marginTop: "50px" }}>
										<NavLink to={`/`}>Tiếp tục mua sắm</NavLink>
									</div>
									<hr style={{ marginTop: "50px" }} />
									<span style={{ color: "#ff789e", fontSize: "12px" }}>
										Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
										<br />
										Mọi thắc mắc và khiếu nại về đơn hàng bạn có thể liên hệ với chùng tôi:
										<ul style={{ marginLeft: "30px" }}>
											<li>
												Hotline: 1900.636.779
											</li>
											<li>
												Email: hotro@moki.vn
											</li>
										</ul>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


module.exports = connect(function (state) {
	return {
		stepOrder: state.stepOrder,
		shoppingCart: state.shoppingCart
	}
})(StepSuccess);