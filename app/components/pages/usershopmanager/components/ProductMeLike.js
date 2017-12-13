import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import { connect } from 'react-redux';
import { setTitle } from 'app/action/actionTitlePage.js'
class ProductMeLike extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                
            ]
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        var that = this;
        
        console.log('bugg');
        that.setState({ loading_product_category: true });
        axios.post('/api/get_my_likes', { category_id: this.props.category_id, index: 0, count: 10 })
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
                axios.post('/api/get_my_likes', { category_id: this.props.category_id, index: (this.state.data.length + 1), count: 10 })
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
        return (

            <div className="container" style={{padding: "20px"}}>
                {/* {this.props.url} */}

                {
                    (!!this.state.data && this.state.data.length > 0) ?
                        this.state.data.map(function (item, index) {
                            return (
                                <div key={index} className="col-md-3 col-xs-6 col-sm-6">
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
        user: state.auth.user
    }
})(ProductMeLike);