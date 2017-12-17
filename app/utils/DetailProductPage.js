import { Link } from 'react-router-dom'
var Rate = require('rc-rate');
import { Tabs, Tab } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from '../components/pages/home/components/SlideProduct';
import Slider from 'react-slick';
const props = { width: 400, zoomZindex: 99, zoomStyle: "z-index:9", zoomWidth: 500, img: "../images/test.jpg" };
import React from 'react';
import moment from 'moment'
import { connect } from 'react-redux';
import { setTitle } from 'app/action/actionTitlePage.js'

import InfoProduct from './components/InfoProduct.js';
import { addCart } from 'app/action/actionShoppingCart.js';
import axios from 'axios';
import date from 'date-and-time';
import * as validator from 'validator'

class Detail extends React.Component {
    constructor(props) {
        super(props);

        //this.data = this.getdata();
        this.state = {
            comment: "",
            listComment: [],
            data: []
        }
    }
    getdata() {
        var that = this;
        axios.post('/api/get_products', { id: 3 })
            .then(function (res) {
                console.log(res.data.data);

                // that.setState({listComment:res.data});
                return res.data.data;
            })
    }
    componentWillReceiveProps(nextProps) {
        var that = this;
        
        this.props.dispatch(setTitle(this.props.titlePage))

        axios.post('/api/get_products', { id: nextProps.product_Id })
            .then(function (res) {
                console.log(res.data.data);
                // that.setState({listComment:res.data});
                that.setState({ data: res.data.data[0] });
            })
        axios.post('/api/get_comment_products', { product_id: nextProps.product_Id })
            .then(function (res) {
                console.log(res.data.data);
                // that.setState({listComment:res.data});
                that.setState({ listComment: res.data.data });
            })

    }
    componentDidMount() {
        var that = this;
        this.props.dispatch(setTitle(this.props.titlePage))

        axios.post('/api/get_products', { id: this.props.product_Id })
            .then(function (res) {
                console.log(res.data.data);
                // that.setState({listComment:res.data});
                that.setState({ data: res.data.data[0] });
            })
        axios.post('/api/get_comment_products', { product_id: this.props.product_Id })
            .then(function (res) {
                console.log(res.data.data);
                // that.setState({listComment:res.data});
                that.setState({ listComment: res.data.data });
            })


    }
    buy(productId) {
        var { dispatch } = this.props;
        console.log('them ' + productId);
        dispatch(addCart())
        console.log("buy");
        $('html,body').animate({
            scrollTop: $("Header").offset().top
        }, 'slow')
    }
    onChange(event) {
        this.setState({ comment: event.target.value });
    }

    comment() {
        let last_id = 0;
        let listComment = this.state.listComment;
        var that = this;
        console.log('comment');
        let now = new Date();
        var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
        if (listComment.length > 0) {
            last_id = listComment[listComment.length - 1].id;
        }
        
        axios.post('/api/set_comment_products', { product_id: this.props.product_Id, comment: this.state.comment, last_id: last_id })
            .then(function (res) {
                if (res.data.code == 1000) {
                    console.log(res.data);
                    listComment = listComment.concat(res.data.data);
                    that.setState({ listComment: listComment })
                }

            })
        this.setState({ comment: "" });
    }
    renderListComment(listComment) {
        var that = this;
        console.log(this.props.product_Id);
        if (listComment === "undefind" || listComment.length === 0) {

            return <p className="no-comments">Chưa có bình luận</p>


        } else {

            return (
                listComment.map(function (comment, index) {
                    console.log(comment);
                    return (

                        <div key={index} className="text-comment parent">
                            <div className="avatar">
                                {/* <img className="img-avatar" src={that.props.auth.isAuthenticatec?that.props.auth.user.avatar:"../images/avatar.png"}/> */}
                                <img className="img-avatar" src={comment.poster.avatar} />

                            </div>

                            <div className="sub-content">
                                <span>Bởi </span>
                                <a className="sub">{comment.poster.name}</a>
                                <span> vào </span>
                                <a className="sub">{moment(comment.created).lang('vi').fromNow()}</a>
                            </div>
                            <p className="content"> {comment.comment} </p>
                        </div>


                    )
                })

            )
        }
    }
    render() {
        console.log(this.state.data);

        if (this.state.data.length === 0) {
            return null
        }

        return (
            <div className="row">
                {/* <InfoProduct productId={this.props.productId} /> */}
                <InfoProduct data={this.state.data} />

                <div className="row">
                    <div className="">
                        <div className="row">
                            <div className="tab-inf">
                                <Tabs defaultActiveKey={1} id="tab-inf">
                                    <Tab eventKey={1} title="Mô tả sản phẩm">
                                        <div className="col-md-12 description-product">
                                            {this.state.data.described}
                                        </div>
                                    </Tab>
                                    <Tab eventKey={2} title="Đánh giá/ phản hồi">
                                        <div className="col-md-12 evaluate-respone-product">
                                            <div className="post-comment">
                                                {/* <p className="no-comments">Chưa có bình luận </p> */}
                                                <div id="commentDiv">
                                                    {this.renderListComment(this.state.listComment)}
                                                </div>
                                                <p className="section">Viết bình luận:  </p>
                                                {this.props.auth.isAuthenticated?<div className="comment-form" style={{zIndex: 10000000000}}>
                                                    <div className="avatar-me">
                                                        <img style={{ width: "55px" }} className="img-avatar" src={this.props.auth.user.avartar} />
                                                    </div>
                                                    <div className="box-comment">
                                                        <textarea onChange={this.onChange.bind(this)} value={this.state.comment} className="form-control" placeholder="Ý kiến của bạn...." id="text-comment" rows="3" style={{position: "relative", zIndex:"999999999"}}></textarea>
                                                        <div className="btn-comment"><button onClick={this.comment.bind(this)} className="btn btn-success" style={{position: "relative", zIndex:"999999999"}} disabled={this.state.comment ? "" : "disabled"} >Gửi</button></div>
                                                    </div>
                                                </div>:
                                                <div style={{marginLeft: "50px", padding: "20px"}}>
                                                    Bạn cần <Link to="/user/login" style={{position: "relative", zIndex:"999999999", color: "#ff789e"}}>Đăng nhập</Link> để bình luận
                                                </div>
                                            }
                                                

                                            </div>
                                        </div>
                                    </Tab>

                                </Tabs>
                            </div>
                            <SlideProduct />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
module.exports = connect(function (state) {
    return {
        auth: state.auth
    }
})(Detail);