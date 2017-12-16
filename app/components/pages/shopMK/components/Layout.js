import React from 'react';
import { connect } from 'react-redux';
import { login } from 'app/action/actionUserName';
import { withRouter } from 'react-router-dom'
import Product from 'app/utils/Product.js'
import axios from 'axios';
import moment from 'moment'
import { BrowserRouter as Router, Route, Switch, Ridirect, hashHistory, Redirect, NavLink } from 'react-router-dom';
class shopMK extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { src: "product1.jpg", name: "Thìa Thay Thế", priceSale: "75,000", pre: "90,000" },
                { src: "product2.jpg", name: "Hút Mũi Cana", priceSale: "75,000", pre: "90,000" },
                { src: "product3.jpg", name: "Ty Giả", priceSale: "75,000", pre: "90,000" },
                { src: "product4.jpg", name: "Vòi phun nước", priceSale: "75,000", pre: "90,000" },
                { src: "product5.jpg", name: "Thìa Vét", priceSale: "75,000", pre: "90,000" },
                { src: "product1.jpg", name: "Thìa Thay Thế", priceSale: "75,000", pre: "90,000" },
                { src: "product2.jpg", name: "Hút Mũi Cana", priceSale: "75,000", pre: "90,000" },
                { src: "product3.jpg", name: "Ty Giả", priceSale: "75,000", pre: "90,000" },
                { src: "product4.jpg", name: "Vòi phun nước", priceSale: "75,000", pre: "90,000" },
                { src: "product5.jpg", name: "Thìa Vét", priceSale: "75,000", pre: "90,000" }
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
    }

    componentDidMount() {
        var that = this;

        axios.post('/api/get_shop_infor', { user_id: this.props.user.user_id })
            .then(res => {
                if (res.data.code == 1000) {

                    that.setState({ shop_info: res.data.data });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        var that = this;

        axios.post('/api/get_shop_infor', { user_id: this.props.user.user_id })
            .then(res => {
                if (res.data.code == 1000) {

                    that.setState({ shop_info: res.data.data });
                }
            });
    }

    render() {
        return (

            <div className="container" style={{ paddingTop: "10px", paddingBottom: "100px" }}>
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
                                        <div className="col-md-9" style={{ paddingTop: "14px" }}>
                                            <div className="col-md-12 tab-admin-shop">
                                                <ul>
                                                    <li ><NavLink to="/shop/admin">Trang chủ</NavLink> </li>
                                                    {/* <li><NavLink to="/shop/admin/product">Quản lý sản phẩm</NavLink> </li> */}
                                                    <li><NavLink to="/shop/admin/order">Quản lý đơn hàng</NavLink> </li>
                                                    {/* <li><NavLink to="/shop/admin/profile">Quản lý tài khoản</NavLink> </li> */}
                                                    <li><NavLink to="/shop/admin/report">Thống kê/báo cáo</NavLink> </li>
                                                </ul>
                                            </div>
                                            <div>
                                                {this.props.children}
                                            </div>
                                            {/* <div className="status-user hidden-xs col-md-12">
                                                            <div className="text-status">
                                                                Shop chuyên bán hàng cho mẹ và bé. Các SP đều được nhập chính hãng, có nguồn gốc xuất xứ rõ ràng nên các mom yên tâm nhé. Shop luôn sẵn sàng tư vấn nhiệt tình, vui lòng khách đến, vừa lòng khách đi. RẤT HÂN HẠNH ĐƯỢC PHỤC V<span className="moreellipses">...</span><span className="morecontent"><span>                        </span>
                                                                <a href="" className="readmorestatus">Đọc thêm</a>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className="title-product">
                                                        <h2>Sản phẩm của shop MK Shop</h2>
                                                        <hr />
                                                    </div>
                                                    <div className="product-user">
                                                            <div className="all-product">
                                                                <div className="product-row">
                                                                    <section>
                                                                        <div className="row">
                                                                             <div className="col-md-12">
                                                                             {
                                                                                this.state.data.map(function(item,index){
                                                                                    return(
                                                                                        <div key={index} style={{width:"33%",float:"left"}}>
                                                                                        <Product  src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  />
                                                                                        </div>
                                                                                    )

                                                                                })
                                                                              }
                                                                             </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                    </div> */}
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

module.exports = connect(function (state) { return { user: state.auth.user } })(shopMK);