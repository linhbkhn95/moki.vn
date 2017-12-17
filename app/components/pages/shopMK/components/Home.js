import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import { connect } from 'react-redux';
import ModalAddProduct from './product/ModalAddProduct.js';
import ModalEditProduct from './product/ModalEditProduct.js';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownload from 'material-ui-icons/FileDownload'
import { CSVLink, CSVDownload } from 'react-csv';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import CircularProgress from 'material-ui/CircularProgress';
import { CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import moment from 'moment'
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                // {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
                // {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
                // {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
                // {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
                // {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},
                // {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
                // {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
                // {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
                // {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
                // {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
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
            },
            showModalAddProduct: false,
            ready_to_download: false,
            loading: false
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.downloadProduct = this.downloadProduct.bind(this);
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

    addProduct(name, number, price, image, described, ships_from, brand_id, category_id, condition_id) {
        let that = this;
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append('name', name);
            formData.append('number', number);
            formData.append('price', price);
            formData.append('described', described);
            formData.append('ships_from', ships_from);
            formData.append('brand_id', brand_id);
            formData.append('category_id', category_id);
            formData.append('condition_id', condition_id);
            formData.append('image', image);
            axios.post('/api/add_products', formData)
                .then(function (res) {
                    setTimeout(function () {
                        that.setState({ loading_product_category: true });
                        axios.post('/api/get_user_listings', { user_id: that.props.user_id })
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
                        resolve(res)
                    }, 1500);
                })
        })
    }

    downloadProduct() {
        let that = this;
        that.setState({ ready_to_download: false, loading: true });
        this.disableScroll()
        axios.post('/api/get_product_all')
            .then(function (res) {
                if (res.data.code == 1000) {
                    let products = res.data.data;
                    let fields = [
                        "Mã sản phẩm",
                        "Tên sản phẩm",
                        "Tình trạng",
                        "Ảnh",
                        "Giá",
                        "Khuyến mại",
                        "Thương hiệu",
                        "Mô tả",
                        "Số lượng",
                        "Số lượt thích",
                        "Số bình luận",
                        "Địa chỉ sản phẩm",
                        "Danh mục",
                        "Ngày đăng"
                    ]

                    let dataFields = products.map((product) => {
                        return [
                            product.code,
                            product.name,
                            product.condition,
                            product.image,
                            product.price,
                            product.price_percent,
                            product.brand,
                            product.described,
                            product.number,
                            product.like,
                            product.comment,
                            product.address,
                            product.category,
                            moment(product.created).format('DD/MM/YYY HH:mm:ss')
                        ]
                    })
                    let data_export = [fields].concat(dataFields);
                    that.setState({ product_all: data_export },
                        () => {
                            that.setState({ ready_to_download: true, loading: false })
                            that.enableScroll()
                        }
                    )
                }
            })
    }

    preventDefault(e) {
        var keys = {37: 1, 38: 1, 39: 1, 40: 1};
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    preventDefaultForScrollKeys(e) {
        var keys = {37: 1, 38: 1, 39: 1, 40: 1};
        if (keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }

    disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onwheel = this.preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
        window.ontouchmove = this.preventDefault; // mobile
        document.onkeydown = this.preventDefaultForScrollKeys;
    }

    enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    showModalAddProduct() {
        this.setState({ showModalAddProduct: true });
    }
    closeModalAddProduct() {
        this.setState({ showModalAddProduct: false });
    }

    render() {
        
        return (
            <div>
                {
                    this.state.loading ?
                        (
                            <Paper style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", zIndex: "100000000", backgroundColor: "rgba(0, 0, 0, 0.1)" }} zDepth={1} >
                                <CircularProgress style={{ left: "50%", top: "50%" }} />
                            </Paper>
                        )
                        : null
                }
                <div className="title-product">
                    <h2>Sản phẩm của shop {this.state.shop_info.shop.shop_name}</h2>
                    <hr />
                </div>
                <button style={{ margin: "30px" }} onClick={this.showModalAddProduct.bind(this)} className="btn btn-primary">Thêm sản phẩm</button>
                <button style={{ margin: "30px", outline: "none" }} onClick={() => { this.downloadProduct() }} className="btn" title="Tải xuống danh sách sản phẩm">
                    <FileDownload />
                </button>
                {
                    this.state.ready_to_download ? <CSVDownload data={this.state.product_all} target="_blank" filename={`${this.props.auth.user.username + "-" + (parseInt(Math.random() * 999999) + "").padStart(6, "0")}.csv`} /> : null
                }

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
                <ModalAddProduct show={this.state.showModalAddProduct} close={this.closeModalAddProduct.bind(this)} addProduct={this.addProduct} />
            </div>
        )
    }
}

module.exports = connect(function (state) { return { auth: state.auth } })(Home);