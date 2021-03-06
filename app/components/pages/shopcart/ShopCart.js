import React from 'react';
import { connect } from 'react-redux';
import { login } from 'app/action/actionUserName';
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, NavLink } from 'react-router-dom';
import { removeCart, setQuantity } from 'app/action/actionShoppingCart';

import ModalOrder from './ModalOrder.js';
import ModalDeleteProduct from './components/ModalDeleteProduct.js';
import { toASCII } from 'punycode';
class shoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            lgShow: false,
            showModalDelete: false,
            productId_Del: null,
            totalPriceSale: 0,
            totalPrice: 0
        }
    }
    login() {
        var { dispatch } = this.props;

        console.log(this.refs.sdt.value + ' ' + this.refs.password.value);
        dispatch(login(this.refs.sdt.value));
        this.props.history.push('/');
    }
    removeProduct(productId) {
        console.log('remove product' + productId);
        this.setState({ showModalDelete: true, productId_Del: productId });

        //   this.props.dispatch(removeCart(productId));
    }
    showOrder() {
        // this.setState({lgShow:true});
        console.log(this)
        this.context.router.history.push('/user/order/step/address')
    }
    componentWillReceiveProps(nextStop) {
        let cart = nextStop.shoppingCart.cart;


        let totalPrice = 0;
        let totalPriceSale = 0;
        cart.forEach(product => {
            let quantity = product.quantity;
            totalPrice += (product.price*quantity);
            let sales = 0;
            if(product.price_percent < 100) {
                sales = product.price_percent*product.price/100;
            } else {
                sales = product.price_percent;
            }
            totalPriceSale += (quantity*sales);
        });
        
        this.setState({ totalPrice: totalPrice, totalPriceSale: totalPriceSale });
    }
    access() {
        console.log('dy');
        if (this.state.productId_Del != null) {
            this.props.dispatch(removeCart(this.state.productId_Del));
        }

        this.setState({ showModalDelete: false, productId_Del: null });
    }
    onChangeQuantity(value, product_id, e) {
        
        if(isNaN(value)) {
            return ;
        }
        var quantity;
        if(!value|| parseInt(value) < 0) {
            e.target.value = 0;
            quantity = 0;
        } else {
            quantity = parseInt(value)< 0?0: parseInt(value);
        }
        this.props.dispatch(setQuantity({ product_id: product_id, quantity: quantity }));
    }
    renderCart(cart) {
        var that = this;
        console.log(this.props);
        if (cart.length > 0) {
            console.log(cart);
            return (
                cart.map(function (product, index) {
                    let name = product.name.replace(/-/g, ' ').replace(/\s\s+/g, ' ');

                    let priceSale = product.price_percent < 100 ? product.price_percent * product.price / 100 : product.price_percent;
                    console.log(product)
                    let price = (
                        <td className="price">
                            <p className="price ng-binding">{(product.price - priceSale).toLocaleString('VND') + "đ"}</p>
                            {priceSale==0?"":<p className="ori_price ng-scope"><s><span className="line ng-binding">{(product.price).toLocaleString('VND') + "đ"}</span></s>&nbsp;&nbsp;&nbsp;<span className="percent ng-binding">KM {(priceSale).toLocaleString('VND') + "đ"}</span></p>}
                        </td>
                    );
                    return (
                        <tr key={index} className="ng-scope">
                            <td className="name">
                                <NavLink to={"/category/product/" + name.split(' ').join('-') + "--" + product.product_id + ".html"}>
                                    <img style={{ width: "50px", height: "50px" }} className="img-responsive btn-block ng-scope" src={product.image} />
                                </NavLink>
                            </td>
                            <td className="noname">
                                <p className="name ng-binding">{product.name}</p>

                                <p className="shopname">Shop <NavLink to={"/shopMK." + product.shop_id + ".html"} className="ng-binding">{product.shop_name}</NavLink></p>
                            </td>
                            {price}
                            <td className="coupon">
                                <input min="1" step="1" onChange={e => that.onChangeQuantity(e.target.value, product.product_id, e)} style={{ textAlign: "center" }} defaultValue={product.quantity} className="form-control ng-pristine ng-untouched ng-valid ng-scope ng-empty" type="number" />

                            </td>
                            <td className="coupon">
                                <input className="form-control ng-pristine ng-untouched ng-valid ng-scope ng-empty" type="text" placeholder="Mã khuyến mại" />

                            </td>
                            <td onClick={that.removeProduct.bind(that, product.product_id)} className="del"><i style={{ cursor: "pointer" }} className="fa fa-times" aria-hidden="true"></i></td>
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
    render() {
        var cart = this.props.shoppingCart.cart;

        let lgClose = () => this.setState({ lgShow: false });
        let closeModalDelete = () => this.setState({ showModalDelete: false });

        return (
            <section className="cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="product_list">
                                <div className="headings">
                                    <h5>Giỏ hàng của tôi </h5>
                                    <span className="number ng-binding">( {this.props.shoppingCart.count}/{this.props.shoppingCart.count} sản phẩm mua được)</span>
                                </div>
                                <div className="content">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead id="tableheader">
                                                <tr>
                                                    <td colSpan="2"><p>Sản phẩm</p></td>
                                                    <td className="price">
                                                        <p style={{ width: "113px" }}>Giá</p>
                                                    </td>
                                                    <td className="coupon">
                                                        <p>Số lượng</p>
                                                    </td>
                                                    <td className="coupon">
                                                        <p style={{ width: "124px" }}>Mã khuyến mại</p>
                                                    </td>
                                                    <td className="del"></td>
                                                </tr>
                                            </thead>
                                            <tbody className="ng-scope">
                                                {this.renderCart(this.props.shoppingCart.cart)}

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="checkout">
                                <div className="headings">
                                    <h5>Thông tin đơn hàng</h5>
                                </div>
                                <div className="content">
                                    <div className="table_price">
                                        <div className="table_price_row row1">
                                            <span className="col">Tạm tính:</span>
                                            <span className="col text-right ng-binding">{(this.state.totalPrice).toLocaleString('VND') + "đ"}</span>
                                        </div>
                                        <div className="table_price_row row2">
                                            <span className="col">Khuyến mại:</span>
                                            <span className="col text-right ng-binding ng-scope" >{"-"+(this.state.totalPriceSale).toLocaleString('VND') + "đ"}</span>
                                        </div>
                                    </div>
                                    <div className="table_price table_price2">
                                        <div className="table_price_row row1">
                                            <span className="col total">Tổng <span className="vat">(Đã bao gồm VAT):</span></span>
                                            <span className="col text-right ng-binding">{(this.state.totalPrice - this.state.totalPriceSale).toLocaleString('VND') + "đ"}</span>
                                        </div>
                                    </div>
                                    <div className="checkoutnow text-center">
                                        <button id="paymentBt" onClick={this.showOrder.bind(this)} className="btn btn-default text-right" disabled={cart.length ? "" : "disabled"}>Đặt hàng</button>
                                        <a href="/">Tiếp tục mua hàng</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <ModalOrder show={this.state.lgShow} onHide={lgClose} />
                <ModalDeleteProduct show={this.state.showModalDelete} onHide={closeModalDelete} access={this.access.bind(this)} />
            </section>

        )
    }
}
shoppingCart.contextTypes = {
    router: React.PropTypes.object.isRequired
}

module.exports = connect(function (state) { return { shoppingCart: state.shoppingCart } })(shoppingCart);
