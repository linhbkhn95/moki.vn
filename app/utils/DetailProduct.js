import React from 'react'
import {Link} from 'react-router-dom'
var Rate = require('rc-rate');
import {Tabs,Tab} from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';
import ReactImageMagnify from 'react-image-magnify';
import SlideProduct from './SlideProduct.js';
import Slider from'react-slick';

const props = {width: 400,zoomZindex:99,zoomStyle:"z-index:9", zoomWidth: 500, img: "../images/test.jpg"};
module.exports = ({ match  }) => {
    console.log(match);
    return (
     
      <div className="row">
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
                      <h2 style={{textAlign:"left"}} className="name-product">Giày cho trẻ em</h2>
                
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
                          <div className="price-pre">80,000</div>
                      </div> 
                </div>
                <div className="col-md-12">
                  <p className="detail">Sản phẩm bán từ shop: <Link to="#"><span>Linhtd</span></Link> </p>
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
                <div className="col-md-12">
                    <div className="btn-buynow">
                        <button className="btn btn-lg btn-success">Mua ngay</button>
                    </div>
                </div>
           </div>
      </div>
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
                                                        <div className="btn-comment"><button className="btn btn-success">Gửi</button></div>
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