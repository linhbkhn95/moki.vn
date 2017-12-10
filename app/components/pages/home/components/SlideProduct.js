import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';

import Product from 'app/utils/Product.js'
class SlideProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
            ]
        };
    }

    componentWillReceiveProps() {
        let that = this;
        axios.post('/api/get_list_products', { index: 0, count: 5 })
            .then(function (res) {
                let data = res.data.data.products;
                that.setState({ data: data });
            })
    }
    componentDidMount() {
        let that = this;
        axios.post('/api/get_list_products', { index: 0, count: 5 })
            .then(function (res) {
                let data = res.data.data.products;
                that.setState({ data: data });
            })
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 600,
            autoplay: true,
            slidesToShow: 3,
            Fade: true,
            slidesToScroll: 1,
            centerMode: true //thừa 1 phần product
        };

        return (
            <div className="product-population">
                <h2>Sán phẩm ưu đãi nổi bật</h2>
                <div className="product-population-item">

                    <Slider {...settings}>
                        {this.state.data.map(function (item, index) {
                            return (
                                <div key={index}>
                                    <Product like={item.like} is_liked={item.is_liked} comment={item.comment} productId={item.id} src={item.image.length > 0 ? item.image[0].url : '../images/product1.jpg'} name={item.name} priceSale={item.price_percent} pre={item.price} />
                                </div>
                            )
                        })
                        }

                    </Slider>
                </div>
            </div>
        )

    }
}

module.exports = SlideProduct;