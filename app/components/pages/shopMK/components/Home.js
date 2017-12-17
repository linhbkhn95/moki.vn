import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import { connect } from 'react-redux';
import ModalAddProduct from './product/ModalAddProduct.js';
import ModalEditProduct from './product/ModalEditProduct.js';
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
            showModalAddProduct: true,
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

    showModalAddProduct(){
        this.setState({showModalAddProduct:true});
    }
    closeModalAddProduct(){
        this.setState({showModalAddProduct:false});
    }

    render() {
        return (
            <div>
                <div className="title-product">
                    <h2>Sản phẩm của shop {this.state.shop_info.shop.shop_name}</h2>
                    <hr />
                </div>
                <button style={{marginTop:"36px"}} onClick={this.showModalAddProduct.bind(this)} className="btn btn-primary">Thêm sản phẩm</button>
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
                                                        <Product like={item.like} is_liked={item.is_liked} productId={item.id} comment={item.comment} src={item.image[0].url} name={item.name} priceSale={item.price_new} pre={item.price_percent} />
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
                <ModalAddProduct show={this.state.showModalAddProduct} close={this.closeModalAddProduct.bind(this)}/>
            </div>
        )
    }
}

module.exports = connect(function (state) { return {auth: state.auth} })(Home);