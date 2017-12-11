import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import { connect } from 'react-redux';
import { setTitle } from 'app/action/actionTitlePage.js'
class CategoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                // {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
                // {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
                // {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
                // {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
                // {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},

                // {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
                // {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
                // {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
                // {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
                // {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
            ]
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        var that = this;
        console.log(this.props.titlePage)
        this.props.dispatch(setTitle(nextProps.titlePage))
        console.log('bugg', this.props.category_id);
        that.setState({ loading_product_category: true });
        axios.post('/api/get_list_products', { category_id: nextProps.category_id, index: 0, count: 10 })
            .then(function (res) {
                console.log(res.data.data.products);
                let data = res.data.data.products;
                let _continueProduct = true;
                if (data.length == 0) {
                    _continueProduct = false;
                }
                that.setState({ loading_product_category: false });
                that.setState({ _continueProduct: _continueProduct, data: data });

            })
        window.addEventListener('scroll', this.handleScroll);
    }
    componentDidMount() {
        var that = this;
        console.log(this.props.titlePage)
        this.props.dispatch(setTitle(this.props.titlePage))
        console.log('bugg');
        that.setState({ loading_product_category: true });
        axios.post('/api/get_list_products', { category_id: this.props.category_id, index: 0, count: 10 })
            .then(function (res) {
                console.log(res.data.data.products);
                let data = res.data.data.products;
                let _continueProduct = true;
                if (data.length == 0) {
                    _continueProduct = false;
                }
                that.setState({ loading_product_category: false });
                that.setState({ _continueProduct: _continueProduct, data: data });

            })
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
                axios.post('/api/get_list_products', { category_id: this.props.category_id, index: (this.state.data.length + 1), count: 10 })
                    .then(function (res) {
                        console.log(res.data.data.products);
                        let data = res.data.data.products;
                        let _continueProduct = true;
                        if (data.length == 0) {
                            _continueProduct = false;
                        }
                        that.setState({ loading_product_category: false });
                        that.setState({ _continueProduct: _continueProduct, data: that.state.data.concat(data) });

                    })
            }
        }
        //console.log(2, itemTranslate)
        // this.setState({
        //   transform: itemTranslate
        // });
    }

    render() {
        console.log(this.props.category_id);
        return (

            <div>

                {/* {this.props.url} */}

                {
                    (!!this.state.data && this.state.data.length > 0) ?
                        this.state.data.map(function (item, index) {
                            return (
                                <div key={index} style={{ width: "33%", float: "left", display: "inline-block" }}>
                                    <Product like={item.like} is_liked={item.is_liked} comment={item.comment} productId={item.id} src={item.image.length > 0 ? item.image[0].url : '../images/product1.jpg'} name={item.name} priceSale={item.price_percent} pre={item.price} />
                                </div>
                            )

                        })
                        : "Danh mục này hiện tại chưa có sản phẩm"
                }
            </div>
        )

    }
}
module.exports = connect(function (state) {
    return {

    }
})(CategoryPage);