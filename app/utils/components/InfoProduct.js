import { Link, NavLink } from 'react-router-dom'
var Rate = require('rc-rate');
import { Tabs, Tab } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from 'app/utils/SlideProduct.js';
import Slider from 'react-slick';
import moment from 'moment'

import React from 'react';
import { connect } from 'react-redux';
import { addCart } from 'app/action/actionShoppingCart.js';
import axios from 'axios';
class InfoProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.data,
        }
    }
    componentDidMount() {

        // axios.post('/product/getDetail', { productId: nextProps.productId })
        // .then(function (res) {
        //     console.log(res.data);
        //     that.setState({ product: res.data });
        // })
        // .catch(function (e) {
        //     console.log(e);
        // })

    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps)
    //     this.setState(nextProps)
    //     console.log(this.state) //=> in ra giá trị cũ của state, không được cập nhật nextProps
    //  }
    // //componentWillMount()
    componentWillReceiveProps(nextProps) {
        // var that = this;

        // console.log(nextProps.productId);
        // axios.post('/product/getDetail', { productId: nextProps.productId })
        //     .then(function (res) {
        //         console.log(res.data);
        //         that.setState({ product: res.data });
        //     })
        //     .catch(function (e) {
        //         console.log(e);
        //     })

    }
    buy(productId) {
        var { dispatch } = this.props;
        console.log(this.refs.quantity.value);
        if (!this.refs.quantity.value || isNaN(this.refs.quantity.value) || parseInt(this.refs.quantity.value) < 1) {
            return;
        }

        let product = {};
        product.product_id = productId;
        product.quantity = parseInt(this.refs.quantity.value);
        product.image = this.state.product.image[0].url;
        product.name = this.state.product.name;
        product.price = this.state.product.price;
        product.price_percent = this.state.product.price_percent;
        product.price_new = this.state.product.price_new;
        product.shop_name = this.state.product.seller.name;
        product.shop_id = this.state.product.seller.id;
        dispatch(addCart(product));

        $('html,body').animate({
            scrollTop: $("Header").offset().top
        }, 'slow')
    }

    like() {
        var that = this;
        var { auth } = this.props;
        if (!auth.isAuthenticated) {
            alert("Bạn chưa đăng nhập")
            this.context.router.history.push('/user/login');
        }
        else {
            axios.post('/api/like_products', { product_id: this.state.product.id })
                .then((res) => {
                    if (res.data.code == 1000) {
                        let product = this.state.product;
                        product.like = res.data.data.like;
                        product.is_liked = !product.is_liked;
                        this.setState({product: product})
                    }
                })
        }
    }

    render() {
        const props = { width: 400, zoomZindex: 99, zoomStyle: "z-index:9", zoomWidth: 500, img: this.state.product.image[0].url };
        console.log("abc", this.state)

        let priceSale = this.state.product.price_percent < 100 ? this.state.product.price_percent * this.state.product.price / 100 : this.state.product.price_percent;
        console.log(this.state.product.price_percent, this.state.product.price)
        let price = (
            <div>
                <div className="price-sale">{(this.state.product.price - priceSale).toLocaleString('VND') + "đ"}</div>
                {priceSale == 0 ? null : <div className="price-pre">{(this.state.product.price).toLocaleString('VND') + "đ"}</div>}
            </div>
        );
        let categories = this.state.product.category;
        let categoriesEl = []
        for (var i = 0; i < categories.length; ++i) {
            let category = categories[i];
            categoriesEl.push(<span key={category.id}>{category.name}</span>);
            categoriesEl = categoriesEl.concat(category.children.map((category) => {
                return (<span key={category.id}>{category.name}</span>);
            }))
        }

        return (
            <div className="row page-detail">
                <div className="col-md-6">
                    {/* <div className="col-md-4">ảnh liên quan</div>
                  <div className="col-md-8">ảnh chính </div> */}
                    <div className="product-image-one col-xs-12">
                        <div className="row">
                            <figure>
                                <ReactImageZoom {...props} > </ReactImageZoom>

                                <figcaption style={{ paddingTop: "10px" }} className="social">
                                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn fa fa-facebook" ></a>
                                    <a href="https://twitter.com/share?status=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn icon fa fa-twitter" ></a>
                                    <a href="https://plus.google.com/share?url=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn fa fa-google-plus" ></a>
                                </figcaption>
                            </figure>

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <h2 style={{ textAlign: "left" }} className="name-product">{this.state.product.name}</h2>

                        <div className="like-product" style={{lineHeight: "2", color: "#ff789e"}}>
                            
                            <div style={{display: "inline-block"}} onClick={this.like.bind(this, this.state.product.id)} >
                                {this.state.product.is_liked?<i style={{ cursor: "pointer", fontSize: "20px", color: "#ff789e" }} className="fa fa-heart" aria-hidden="true"/>:<i style={{ cursor: "pointer", fontSize: "20px", color: "#ff789e" }} className="fa fa-heart-o" aria-hidden="true"/>}
                            </div>
                            &nbsp;{this.state.product.like}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div style={{ textAlign: "left", borderBottom: "1px solid #d9d9da" }} className="price-product">
                            {price}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <p className="detail">Sản phẩm bán từ shop: <NavLink to={"/shopMK." + this.state.product.seller.id + ".html"} className="ng-binding" style={{ color: "#ff789e" }}>{this.state.product.seller.name}</NavLink></p>
                        <p className="detail">Diểm uy tín shop: <span>{this.state.product.seller.score}</span></p>
                        <p className="detail">Số sản phẩm: <span>{this.state.product.seller.listing}</span> </p>
                        <p className="detail">Ngày tham gia: <span>{moment(this.state.product.seller.created).format('DD/MM/YYYY')}</span> </p>
                    </div>
                    <div className="col-md-12">
                        <div style={{ borderBottom: "1px solid #d9d9da", lineHeight: "0" }}></div>
                    </div>
                    <div className="col-md-12">
                        <p className="detail"><i className="fa fa-bullseye"></i>Trạng thái: <span>{this.state.product.condition}</span> </p>
                        <p className="detail"><i className="fa fa-folder"></i>Thuộc danh mục: <Link to="#">
                            {
                                categoriesEl.map((categoryEl) => {
                                    return categoryEl
                                })
                            }
                        </Link> </p>
                        <p className="detail"><i className="fa fa-tags"></i>Tags: <Link to="#">
                            {
                                categoriesEl.map((categoryEl) => {
                                    return categoryEl
                                })
                            }
                        </Link>
                            <span>, </span>
                            <Link to="#">
                                <span>{this.state.product.seller.name}</span>
                            </Link> </p>
                    </div>
                    <div className="col-md-12">

                        <div style={{ borderBottom: "1px solid #d9d9da", lineHeight: "0" }}></div>
                    </div>
                    <div style={{ paddingTop: "11px" }} className="col-md-12">
                        <div style={{ paddingTop: "7px", fontSize: "16px" }} className="col-md-3">Số lượng</div>
                        <div className="col-md-4">
                            <input type="number" ref="quantity" style={{ fontSize: "16px" }} defaultValue="1" className="form-control " />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div style={{ paddingTop: "20px" }} className="btn-buynow">
                            {/* <button onClick={this.buy.bind(this,this.state.product.Id)} className="btn btn-lg btn-success">Mua ngay</button> */}
                            <button onClick={this.buy.bind(this, this.state.product.id)} className="btn btn-lg btn-success">Mua ngay</button>

                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
module.exports = connect(function (state) {
    console.log("log", state)
    return {
        auth: state.auth
    }
})(InfoProduct);