import {Link} from 'react-router-dom'
var Rate = require('rc-rate');
import {Tabs,Tab} from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from 'app/utils/SlideProduct.js';
import Slider from'react-slick';
const props = {width: 400,zoomZindex:99,zoomStyle:"z-index:9", zoomWidth: 500, img: "../images/test.jpg"};
import React from 'react';
import {connect} from 'react-redux';


class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state={
              
        }
    }
    buy(productId){
        var {dispatch} = this.props ;
        console.log('them ' +productId);
        dispatch(addCart())
        console.log("buy");
        $('html,body').animate({
            scrollTop:$("Header").offset().top
        },'slow')
    }
    render(){
        console.log(this.props.productId)
        return(
          <div className="row">
                <div className="post-comment">
                            {/* <p className="no-comments">Chưa có bình luận </p> */}
                            <div id="commentDiv">
                                    <div className="text-comment parent">
                                        <div className="avatar">
                                            <img className="img-avatar" src="../images/anhdaidienlinh.jpg"/>
                                        </div>
                                        
                                        <div className="sub-content">
                                            <span>Bởi </span> 
                                            <a className="sub">Trịnh đức Bảo Linh </a> 
                                            <span>lúc </span> 
                                            <a className="sub">08:57pm 01/10/2017</a>
                                    
                                        
                                        </div>
                                        <p className="content"> Đẹp </p>
                                </div>

                            </div>
                            <p className="section">Viết bình luận:  </p>
                            <div className="comment-form">
                                <div className="avatar-me">
                                        <img src="../images/avatar.png"/>
                                </div>
                                <div className="box-comment">
                                    <textarea className="form-control" placeholder="Ý kiến của bạn...." id="text-comment" rows="3"></textarea>
                                    <div className="btn-comment"><button className="btn btn-success">Gửi</button></div>
                                </div>
                            </div>

                    </div>   
            </div> 

        )
    }
}
module.exports = connect(function(state){return{}})(Detail);