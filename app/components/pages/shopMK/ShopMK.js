import React from 'react';
import { connect } from 'react-redux';
import { login } from 'app/action/actionUserName';
import { withRouter } from 'react-router-dom'
import Product from 'app/utils/Product.js'
import axios from 'axios';
import moment from 'moment'
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect } from 'react-router-dom';
class shopMK extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [

            ],
            shop_info: {
                "id": 2174,
                "username": "Mẹ Chiaki",
                "avartar": "https://moki.vn/files/avatar/avatar_9365_1498545382.jpg",
                "email": "mechiaki@moki.com",
                "create": "2017-09-23T17:33:09.000Z",
                "city": "Hà Nội",
                "shop": {
                    "shop_name": "Mẹ Chiaki",
                    "address_shop": "Số 1, Đại Cồ Việt, Hà Nội",
                    "score": 22,
                    "listing": 46
                },
                "top_comments": [
                ]
            }
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        var that = this;
        that.setState({ loading_product_category: true });
        axios.post('/api/get_user_listings', { user_id: nextProps.user_id })
            .then(res => {
                if (res.data.code == 1000) {
                    let data = res.data.data || [];
                    let _continueProduct = true;
                    if (data.length == 0) {
                        _continueProduct = false;
                    }
                    that.setState({ data: data });
                    that.setState({ _continueProduct: _continueProduct, loading_product_category: false });
                }
            });

        axios.post('/api/get_shop_infor', { user_id: this.props.user_id })
            .then(res => {
                if (res.data.code == 1000) {

                    that.setState({ shop_info: res.data.data });
                }
            });
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidMount() {
        var that = this;
        that.setState({ loading_product_category: true });
        axios.post('/api/get_user_listings', { user_id: this.props.user_id })
            .then(res => {
                if (res.data.code == 1000) {
                    let data = res.data.data || [];
                    let _continueProduct = true;
                    if (data.length == 0) {
                        _continueProduct = false;
                    }
                    that.setState({ data: data });
                    that.setState({ _continueProduct: _continueProduct, loading_product_category: false });
                }
            });

        axios.post('/api/get_shop_infor', { user_id: this.props.user_id })
            .then(res => {
                if (res.data.code == 1000) {

                    that.setState({ shop_info: res.data.data });
                }
            });
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        let totalScroll = event.srcElement.body.scrollHeight;
        let that = this;

        if (totalScroll - scrollTop - window.innerHeight < 150) {
            if (!!this.state._continueProduct && !this.state.loading_product_category) {
                console.log('get product')
                that.setState({ loading_product_category: true });
                axios.post('/api/get_user_listings', { user_id: this.props.user_id, index: (this.state.data.length + 1), count: 10 })
                    .then(function (res) {
                        let data = res.data.data || [];
                        let _continueProduct = true;
                        if (data.length == 0) {
                            _continueProduct = false;
                        }
                        that.setState({ loading_product_category: false });
                        that.setState({ _continueProduct: _continueProduct, data: that.state.data.concat(data) });
                    })
            }
        }
    }

    render() {
        return (
            <div className="container" style={{ paddingTop: "10px" }}>
                <div className="fix-product">
                    <div className="row">
                        <section id="user_main">
                            <div className="col-md-12">
                                <div className="home-user">
                                    <div className="banner" style={{ background: "url('https://moki.vn/moki/themes/img/cover-default.jpg')", backgroundSize: "cover" }}>
                                        <div className="background-cover">
                                        </div>
                                        <div className="link-share visible-xs">
                                            <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389" >
                                                <i className="icon-svg svg-social-facebook"></i>
                                            </a>
                                            <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                <i className="icon-svg svg-social-twitter"></i>
                                            </a>
                                            <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                <i className="icon-svg svg-social-google"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="group-head">
                                        <div className="bt-info">
                                            <div className="img-left">
                                                <div className="avatar-user">
                                                    <div className="img-thumbnail itemImage" style={{ backgroundImage: `url(${this.state.shop_info.avartar})` }}></div>
                                                </div>
                                            </div>
                                            <div className="name-user">
                                                {this.state.shop_info.shop.shop_name}            </div>
                                        </div>
                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                    <li>
                                                        <p>
                                                            <span className="color-title">
                                                                <i className="fa fa-shopping-bag"></i> Sản phẩm :
                                                            </span>
                                                            <span className="total_product">
                                                                {this.state.shop_info.shop.listing}                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-shopping-bag"></i> Người theo dõi:</span>
                                                            <span className="total_product">
                                                                {this.state.shop_info.shop.score}                            </span>
                                                        </p>
                                                    </li>
                                                    {/* <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-shopping-bag"></i> Đánh giá :</span>
                                                            <span className="total_product">
                                                                31                            </span>
                                                        </p>
                                                    </li> */}
                                                    <li>
                                                        <div className="link-share">
                                                            <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389">
                                                                <i className="fa fa-facebook "></i>
                                                            </a>
                                                            <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                                <i className="fa fa-twitter "></i>
                                                            </a>
                                                            <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                                <i className="fa fa-google "></i>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="content-main">
                                    <div className="row">
                                        <div className="col-md-3 col-xs-12">
                                            <div className="fixMenu">
                                                <div className="left-list">
                                                    <h3 className="text-box">Giới thiệu</h3>
                                                    <table className="table table-reflow">
                                                        <tbody><tr>
                                                            <td>
                                                                <span className="color-title">
                                                                    <i className="fa fa-shopping-bag"></i> Số sản phẩm
                                                                        </span>
                                                            </td>
                                                            <td>
                                                                <span className="total_product">
                                                                    {this.state.shop_info.shop.listing}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="color-title">
                                                                        <i className="fa fa-users"></i> Người theo dõi
                                                                        </span>
                                                                </td>
                                                                <td>
                                                                    <span className="total_product">
                                                                        {this.state.shop_info.shop.score}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="color-title"><i className="fa fa-calendar"></i> Tham gia</span>
                                                                </td>
                                                                <td>
                                                                    <span className="total_product">{moment(this.state.shop_info.create).lang('vi').fromNow()}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="color-title"><i className="fa fa-location-arrow"></i> Khu vực</span>
                                                                </td>
                                                                <td>
                                                                    <span className="total_product"> {this.state.shop_info.city}</span>
                                                                </td>
                                                            </tr>

                                                        </tbody></table>
                                                </div>
                                                <div className="left-list">
                                                    <h3 className="text-box">Đánh giá gần đây</h3>
                                                    <aside>
                                                        <div className="comment">
                                                            {
                                                                this.state.shop_info.top_comments.length == 0 ? <div>Không có đánh giá</div> :
                                                                    this.state.shop_info.top_comments.map((comment, index) => {
                                                                        return (
                                                                            <div className="item" key={`shop-topcomment-moki-${index}`}>
                                                                                {index !== 0 ? <hr /> : null}
                                                                                <figure>
                                                                                    <img className="commentor_avatar" src={comment.poster.avatar} alt="Moki.vn - Ứng dụng mua bán trên di động | ZIN XaLa" />
                                                                                </figure>
                                                                                <p className="text-a truncated" style={{ wordWrap: "break-word" }}>
                                                                                    {comment.comment}
                                                                                </p>
                                                                                <div className="sub-content">
                                                                                    <span>Bởi</span> <a className="sub">{comment.poster.name}</a> <span>vào</span> <a className="sub">{moment(comment.created).lang('vi').fromNow()}</a>
                                                                                </div>

                                                                            </div>
                                                                        )
                                                                    })
                                                            }
                                                        </div>
                                                    </aside>
                                                </div>
                                            </div>






                                        </div>
                                        <div className="col-md-9">
                                            {/* <div className="status-user hidden-xs">
                                                <div className="text-status">
                                                    Shop chuyên bán hàng cho mẹ và bé. Các SP đều được nhập chính hãng, có nguồn gốc xuất xứ rõ ràng nên các mom yên tâm nhé. Shop luôn sẵn sàng tư vấn nhiệt tình, vui lòng khách đến, vừa lòng khách đi. RẤT HÂN HẠNH ĐƯỢC PHỤC V<span className="moreellipses">...</span><span className="morecontent"><span>                        </span>
                                                        <a href="" className="readmorestatus">Đọc thêm</a>
                                                    </span>
                                                </div>
                                            </div> */}
                                            <div className="title-product">
                                                <h2>Sản phẩm của shop {this.state.shop_info.shop.shop_name}</h2>
                                                <hr />
                                            </div>
                                            <div className="product-user">
                                                <div className="all-product">
                                                    <div className="product-row">
                                                        <section>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {
                                                                        this.state.data.map(function (item, index) {
                                                                            return (
                                                                                <div key={`shop-product-moki-${index}`} style={{ width: "33%", float: "left" }}>
                                                                                    <Product like={item.like} is_liked={item.is_liked} productId={item.id} comment={item.comment} src={item.image[0].url} name={item.name} priceSale={item.price_percent} pre={item.price} />
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </section>
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

module.exports = connect(function (state) { return {} })(shopMK);