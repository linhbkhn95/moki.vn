import React from 'react';
import { connect } from 'react-redux';
import { stepSuccess } from 'app/action/actionStepOrder.js';
import axios from 'axios';
import { resetCart } from 'app/action/actionShoppingCart.js';
class StepPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lgShow: false,
            showModalDelete: false,
            productId_Del: null,
            totalPrice: 0,
            totalPriceSale: 0
        }
    }
    componentWillReceiveProps(nextStop) {
        let cart = nextStop.shoppingCart.cart;
        if (!Object.keys(this.props.stepOrder.adress).length) {
            this.props.history.push('/user/order/step/address')
        }

        let totalPrice = 0;
        let totalPriceSale = 0;
        cart.forEach(product => {
            let quantity = product.quantity;
            totalPrice += (product.price * quantity);
            let sales = 0;
            if (product.price_percent < 100) {
                sales = product.price_percent * product.price / 100;
            } else {
                sales = product.price_percent;
            }
            totalPriceSale += (quantity * sales);
        });

        this.setState({ totalPrice: totalPrice, totalPriceSale: totalPriceSale });
    }
    componentDidMount() {
        if (!Object.keys(this.props.stepOrder.adress).length) {
            this.props.history.push('/user/order/step/address')
        }
        let cart = this.props.shoppingCart.cart;
        let totalPrice = 0;
        let totalPriceSale = 0;
        cart.forEach(product => {
            let quantity = product.quantity;
            totalPrice += (product.price * quantity);
            let sales = 0;
            if (product.price_percent < 100) {
                sales = product.price_percent * product.price / 100;
            } else {
                sales = product.price_percent;
            }
            totalPriceSale += (quantity * sales);
        });

        this.setState({ totalPrice: totalPrice, totalPriceSale: totalPriceSale });
    }
    renderCart(cart) {
        var that = this;
        if (cart.length > 0) {
            return (
                cart.map(function (product, index) {
                    let priceSale = 0;
                    if (product.price_percent < 100) {
                        priceSale = product.price_percent * product.price / 100;
                    } else {
                        priceSale = product.price_percent;
                    }

                    let temp;
                    if (priceSale == 0) {
                        temp = (<p className="price ng-binding ng-scope">{product.price.toLocaleString('VND') + "đ"} x {product.quantity}</p>)
                    } else {
                        temp = (<p className="price ng-binding ng-scope">{product.price.toLocaleString('VND') + "đ"} x {product.quantity} - {priceSale.toLocaleString('VND') + "đ"} x {product.quantity}</p>)
                    }
                    return (
                        <tr className="ng-scope" key={`step-payment-rencar-${index}`}>
                            <td className="name" style={{ whiteSpace: "normal", "paddingLeft": "8px" }}>
                                <p className="price ng-binding">{product.name} ({product.quantity})</p>
                            </td>
                            <td className="price text-right">
                                {temp}
                                {/* <p className="price ng-binding ng-scope" >- 3,000đ</p> */}
                                <p className="price ng-binding ng-scope">= {((product.price - priceSale) * product.quantity).toLocaleString('VND') + "đ"}</p>
                            </td>
                            <td className="note">
                                <p className="price ng-scope">&nbsp;</p>
                                {/* <p className="price ng-binding ng-scope">(KM 8%)</p> */}
                                <p className="price ng-scope"></p>
                            </td>
                        </tr>
                    )

                })
            )
        }
        else {
            return (
                <tr>
                    <td>
                        <div style={{ paddingLeft: "20px", color: "#b3aa9e" }}>Không có sản phẩm nào được mua </div>
                    </td>
                </tr>
            )
        }
    }
    nextStep() {
        var { dispatch } = this.props
        let data = {};
        var cart = this.props.shoppingCart.cart.map((product) => {
            return {
                product_id: product.product_id,
                number: product.quantity
            }
        })
        let address = this.props.stepOrder.adress.split(/','/g)
        data.order_detail = cart;
        data.city = address[address.length-1];
        data.phone = document.getElementById("value-phone").value||"";
        data.address = this.props.stepOrder.adress;

        var check = data.phone.match(/(\+849|\+841[2|6|8|9]|09|01[2|6|8|9])+([0-9]{8})\b/g);
        
        if(!check || check.length != 1 || check[0].length !== data.phone.trim().length) {
            alert("Bạn chưa nhập đúng số điện thoại");
            return ;
        }

        var r = confirm("Bạn chắc chắn muốn đặt đơn hàng này!");
        if (r == true) {            
            axios.post('/api/buy_cart', data)
                .then((res) => {
                    if (res.data.code == 1000) {
                        dispatch(resetCart())
                        dispatch(stepSuccess())
                        this.props.history.push('/user/order/step/success')
                    } else {
                        alert("Đặt đơn hàng chưa thành công")
                    }
                })
        }
    }
    render() {
        var cart = this.props.shoppingCart.cart;
        console.log("address", this.props)
        return (
            <div className="background-cart" key="step-payment">
                <div className="container">
                    <div className="row">
                        <section className="thanhtoan">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-5 ng-scope">
                                        <div className="luachonphuongthucthanhtoan">
                                            <div className="headings">
                                                <h5>Lựa chọn hình thức thanh toán</h5>
                                            </div>
                                            <div role="tabpanel main-tabs">

                                                <ul className="nav" role="" id="payTypeSl">
                                                    <li style={{ width: "100%", padding: "20px" }} className="active">
                                                        <label>
                                                            <input type="radio" name="site_name" value={"Thanh toán khi nhận hàng"} defaultChecked={true} /> Thanh toán khi nhận hàng
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <hr />
                                            <div className="headings">
                                                <h5>Thông tin người nhận</h5>
                                            </div>
                                            <div role="tabpanel main-tabs">

                                                <ul className="nav" role="" id="payTypeSl">
                                                    <li style={{ width: "100%", padding: "20px" }} className="active">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Tên người mua: {this.props.user.name}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="nav" role="" id="payTypeSl">
                                                    <li style={{ width: "100%", padding: "20px" }} className="active">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <label>Địa chỉ giao hàng: {!!Object.keys(this.props.stepOrder.adress).length ? this.props.stepOrder.adress : ""}</label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <ul className="nav" role="" id="payTypeSl">
                                                    <li style={{ width: "100%", padding: "20px" }} className="active">
                                                        <div className="form-group">
                                                            <div className="col-sm-12">
                                                                <input type="text" className="form-control" id="value-phone" name="addressOrther" placeholder="Số điện thoại" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane active" id="home">
                                                    <p>Bạn sẽ thanh toán bằng tiền mặt sau khi nhận hàng</p>
                                                    <button className="btn btn-default text-right hidden-xs" onClick={this.nextStep.bind(this)}>Hoàn tất đơn hàng</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout_info_price ng-scope">
                                            <div className="">
                                                <div className="headings">
                                                    <h5>Thông tin đơn hàng </h5>

                                                </div>
                                                <div className="content content_card" style={{ marginTop: "0px" }}>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead id="tableheader">
                                                                <tr>
                                                                    <td colSpan="2" className="noname">
                                                                        <p className="text-left">Sản phẩm</p>
                                                                    </td>
                                                                    <td className="price">
                                                                        <p className="text-right">Giá</p>
                                                                    </td>
                                                                    <td className="note">
                                                                        <p className="text-right">Ghi chú</p>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.renderCart(cart)}
                                                            </tbody>
                                                        </table>
                                                        <hr className="hidden-lg hidden-md hidden-sm line-hr" />
                                                        <table className="lebta">
                                                            <thead id="tableheader">
                                                                <tr>
                                                                    <td className="noname">
                                                                        <span className="col total">Tổng tiền<span className="vat">(Đã gồm VAT):</span></span>
                                                                    </td>
                                                                    <td className="price text-right price-colors">
                                                                        <p className="ng-binding">{(this.state.totalPrice - this.state.totalPriceSale).toLocaleString('VND') + "đ"}</p>
                                                                    </td>
                                                                    <td className="price text-right price-colors">
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3">
                                                                        <img src="/moki/themes/img/linhtinh.png" className="img-responsive" />
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = connect(function (state) {
    return {
        stepOrder: state.stepOrder, shoppingCart: state.shoppingCart, user: state.auth.user
    }
})(StepPayment);