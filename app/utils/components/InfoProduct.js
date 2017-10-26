import {Link} from 'react-router-dom'
var Rate = require('rc-rate');
import {Tabs,Tab} from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from 'app/utils/SlideProduct.js';
import Slider from'react-slick';

import React from 'react';
import {connect} from 'react-redux';
import {addCart} from 'app/action/actionShoppingCart.js';
import axios from 'axios';
class InfoProduct extends React.Component{
    constructor(props){
        super(props);
        this.state={
              product:{
                  Id:"5",
                  nameProduct:"Giày cho trẻ em",
                  price:"80,000",
                  shopMK:"shopLinh",
                  urlImage:"../images/test.jpg"
              }
         
        }
    }
    componentDidMount(){
        
           var that =this;
            axios.post('/product/getDetail',{productId:this.props.productId})
            .then(function(res){
                console.log(res.data);
                that.setState({product:res.data});
            })
            .catch(function(e){
                console.log(e);
            })
         
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps)
    //     this.setState(nextProps)
    //     console.log(this.state) //=> in ra giá trị cũ của state, không được cập nhật nextProps
    //  }
    // //componentWillMount()
    componentWillReceiveProps(nextProps) {
        var that =this;
       
            console.log(nextProps.productId);
            axios.post('/product/getDetail',{productId:nextProps.productId})
            .then(function(res){
                console.log(res.data);
                that.setState({product:res.data});
            })
            .catch(function(e){
                console.log(e);
            })
        
    }
    buy(productId){
        var {dispatch} = this.props ;
        console.log(this.refs.quantity.value);
        dispatch(addCart(this.state.product)); 
      
        $('html,body').animate({
            scrollTop:$("Header").offset().top
        },'slow')
    }
    render(){
        const props = {width: 400,zoomZindex:99,zoomStyle:"z-index:9", zoomWidth: 500, img: this.state.product.urlImage};
        console.log(this.props.productId)
        return( 
          <div className="row page-detail">
                    <div className="col-md-6">
                  {/* <div className="col-md-4">ảnh liên quan</div>
                  <div className="col-md-8">ảnh chính </div> */}
                  <div className="product-image-one col-xs-12">
                        <div className="row">
                          <figure>
                               <ReactImageZoom {...props} >aaa </ReactImageZoom>
                        
                              <figcaption style={{paddingTop:"10px"}} className="social">
                                                      <a href="https://www.facebook.com/sharer/sharer.php?u=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn fa fa-facebook" ></a>
                                                      <a href="https://twitter.com/share?status=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn icon fa fa-twitter" ></a>
                                                      <a href="https://plus.google.com/share?url=https://moki.vn/san-pham/Giay-bup-be-be-gai-14487.html" className="readmore_btn fa fa-google-plus" ></a>
                              </figcaption>
                              </figure>
                            
                        </div>
                  </div>
              </div>
              <div className="col-md-6">
                    <div className="col-md-12">
                        <h2 style={{textAlign:"left"}} className="name-product">{this.state.product.nameProduct}</h2>
                  
                        <div style={{textAlign:"left"}} className="vote">
              
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                                <i className="fa fa-star-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div style={{textAlign:"left", borderBottom: "1px solid #d9d9da"}} className="price-product">
                            <div className="price-sale">67,000</div>
                            <div className="price-pre">{this.state.product.price}</div>
                        </div> 
                  </div>
                  <div className="col-md-12">
                    <p className="detail">Sản phẩm bán từ shop: <Link to="#"><span>{this.state.product.shopMK}</span></Link> </p>
                    <p className="detail">Diểm uy tín shop: <span>5</span></p>
                    <p className="detail">Số sản phẩm: <span>715</span> </p>
                    <p className="detail">Ngày tham gia: <span>25/12/2016</span> </p>
                  </div>
                  <div className="col-md-12">
                      <div style={{borderBottom: "1px solid #d9d9da",lineHeight: "0"}}></div>
                  </div>
                  <div className="col-md-12">
                     <p className="detail"><i className="fa fa-bullseye"></i>Trạng thái: <span>Mới</span> </p>
                     <p className="detail"><i className="fa fa-folder"></i>Thuộc danh mục:<Link to="#"><span>Bát thì đĩa ăn dặm</span></Link> </p>
                     <p className="detail"><i className="fa fa-tags"></i>Trạng thái: <Link to="#"><span>Bát thì đĩa ăn dặm</span></Link> <span>,</span>  <Link to="#"><span>Mono shop</span></Link> </p>
                  </div>
                  <div className="col-md-12">

                      <div style={{borderBottom: "1px solid #d9d9da",lineHeight: "0"}}></div>
                  </div>
                  <div style={{paddingTop:"11px"}} className="col-md-12">
                      <div style={{paddingTop:"7px",fontSize:"16px"}} className="col-md-3">Số lượng</div>
                      <div className="col-md-4">
                        <input type="number" ref="quantity" style={{fontSize:"16px"}} defaultValue="1" className="form-control " />
                      </div>
                  </div>
               
                  <div className="col-md-12">
                      <div style={{paddingTop:"20px"}} className="btn-buynow">
                          <button onClick={this.buy.bind(this,this.state.product.Id)} className="btn btn-lg btn-success">Mua ngay</button>
                      </div>
                     
                  </div>
             </div>
            </div> 

        )
    }
}
module.exports = connect(function(state){return{}})(InfoProduct);