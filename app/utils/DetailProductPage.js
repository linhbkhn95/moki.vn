import {Link} from 'react-router-dom'
var Rate = require('rc-rate');
import {Tabs,Tab} from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from './SlideProduct.js';
import Slider from'react-slick';
const props = {width: 400,zoomZindex:99,zoomStyle:"z-index:9", zoomWidth: 500, img: "../images/test.jpg"};
import React from 'react';
import {connect} from 'react-redux';

import InfoProduct from './components/InfoProduct.js';
import {addCart} from 'app/action/actionShoppingCart.js';
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
           <InfoProduct productId={this.props.productId} />
          <div className="row">
            <div className="">
                <div className="row">
                  <div className="tab-inf">
                      <Tabs defaultActiveKey={1} id="tab-inf">
                              <Tab eventKey={1} title="Mô tả sản phẩm">
                                   <div className="col-md-12 description-product">
                                   <p>Đệm Bịt Góc An Toàn Canpol 74/012 sẽ giúp tránh làm bé bị tổn thương bởi các vật dụng trong nhà như cánh tủ, ngăn kéo, góc bàn, cạnh bàn. Các sản phẩm bảo vệ an toàn của Canpol giúp bảo vệ bé an toàn khi chơi trong nhà. Có thể sử dụng được ở một vài nơi góc cạnh trong nhà như tủ kiếng, tủ tivi. Sản phẩm được tháo lắp khá dễ dàng và vệ sinh đơn giản.<br/>
                                   * Thông tin sản phẩm<br />
                                   * Êm ái, bền bỉ<br />
                                   - Đệm Bịt Góc An Toàn Canpol 74/012 được làm cao su tự nhiên, có khả năng chống cháy, không độc hại, bảo vệ an toàn tuyệt đối cho bé yêu của bạn.<br/>
                                   * An toàn cho bé<br />
                                   - Trong giai đoạn đầu đời, việc bé hiếu động khám phá mọi thứ trong ngôi nhà là điều dễ hiểu. Đệm Bịt Góc An Toàn Canpol 74/012 dùng để che kín các cạnh bàn trong nhà với các miếng đệm có phần băng dán để cố định với bất kì loại góc cạnh nào có thể gây nguy hiểm cho bé. Các bé sẽ thoải mái vui chơi với mọi ngóc ngách trong nhà.<br/>
                                   * Dễ sử dụng<br />
                                   - Với thiết kế nhỏ gọn, bạn sẽ dễ dàng cất giữ vào hộp hay vào tủ khi không cần thiết, để sản phẩm được bền bỉ hơn. Ngoài ra, sản phẩm còn dễ gắn và dễ tháo trên tất cả các bàn làm bằng những loại vật liệu khác nhau.<br/>
                                   Từ khóa: Đệm bịt góc</p>
                                   </div>
                              </Tab>
                              <Tab eventKey={2} title="Đánh giá/ phản hồi">   
                                      <div className="col-md-12 evaluate-respone-product">
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
                                                          <div className="btn-comment"><button onClick={this.comment.bind(this)} className="btn btn-success">Gửi</button></div>
                                                      </div>
                                                  </div>
  
                                          </div>     
                                       </div>
                              </Tab>
                          
                      </Tabs>
                  </div>
               </div>
            </div>
            <div className="ajax-same-user">
                  <div className="">
                          <div className="col-md-12">
                              <div className="box-box">
                                  <div className="border-bottom-box">
                                     <div className="tab-nav">
                                          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 ">
                                                  <p className="detail">Các sản phẩm bán từ shop : 
                                                      <a href="/shop/MK.Shop.5389">
                                                          <span>MK Shop</span> 
                                                      </a>
                                                  </p>
                                           </div>
                                     </div>
                                     <div className="col-md-12">
                                          <SlideProduct />
                                     </div>
                                  </div>
                                  
                              </div>
                          </div>
                   </div>
            </div>
  
            <div className="ajax-same-category">
                  <div className="">
                          <div className="col-md-12">
                              <div className="box-box">
                                  <div className="border-bottom-box">
                                     <div className="tab-nav">
                                          <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12 ">
                                                  <p className="detail">Các sản phẩm cùng danh mục
                                                    
                                                  </p>
                                           </div>
                                     </div>
                                     <div className="col-md-12">
                                          <SlideProduct />
                                     </div>
                                  </div>
                                  
                              </div>
                          </div>
                   </div>
            </div>
         </div>
       </div> 

        )
    }
}
module.exports = connect(function(state){return{}})(Detail);