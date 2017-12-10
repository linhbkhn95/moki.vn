import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {



            is_liked: 0,
            like: 1

        }
    }
    like() {
        var that = this;
        var { auth } = this.props;
        if (!auth.isAuthenticated) {

            this.context.router.history.push('/user/login');
        }
        else {
            axios.post('/api/like_products', { product_id: this.props.productId })
                .then((res) => {
                    if (res.data.code == 1000) {
                        that.setState({ is_liked: !that.state.is_liked, like: res.data.data.like })
                    }
                })



        }
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            let product = {};
            product.like = this.props.like;
            product.is_liked = this.props.is_liked;

        }
    }
    componentWillReceiveProps(NextProps) {

    }
    render() {
        let priceSale = this.props.priceSale < 100 ? this.props.priceSale * this.props.pre / 100 : this.props.priceSale;

        let price = (
            <div className="price-product">
                <div className="price-sale">{this.props.pre - priceSale}</div>
                {priceSale==0?<div className="price-pre"><br /></div>:<div className="price-pre">{this.props.pre}</div>}
            </div>
        );
        return (
            <div className="product ">
                <div className="img-product">
                    <NavLink to={"/category/product/" + this.props.name.trim().split(' ').join('-') + "--" + this.props.productId + ".html"}><img style={{ width: "100%", height: "250px" }} src={this.props.src} /></NavLink>
                </div>
                <div className="name-product">
                    <NavLink to={"/category/product/" + this.props.name.trim().split(' ').join('-') + "--" + this.props.productId + ".html"}>{this.props.name} </NavLink>
                </div>

                <div className="vote">
                    {/* <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i>
             <i className="fa fa-star-o" aria-hidden="true"></i> */}
                    <div className="like-product">
                        {this.props.auth.isAuthenticated ? this.state.like : this.props.like} <i onClick={this.like.bind(this, this.props.productId)} style={{ fontWeight: this.state.is_liked ? "bold" : "normal", cursor: "pointer", fontSize: "20px" }} className="fa fa-heart-o" aria-hidden="true"> </i><i style={{ fontSize: "20px" }} className="fa fa-comment-o icon-comment" aria-hidden="true"></i><i style={{ fontSize: "13px" }}>{this.props.comment}</i>
                    </div>
                </div>
                {price}
            </div>

        )
    }
}

Product.contextTypes = {
    router: React.PropTypes.object.isRequired
}


module.exports = connect(function (state) {
    return {
        auth: state.auth
    }
})(Product);