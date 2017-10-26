import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import Product from 'app/utils/Product.js'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
class shopMK extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
            {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},
            {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
            {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        return(
              <div className="container" style={{paddingTop:"10px"}}>
                  <div className="fix-product">
                      <div className="row">
                            <section id="user_main">
                                 <div className="col-md-12">
                                      <div className="home-user">
                                        <div className="banner" style={{background:"url('https://moki.vn/files/avatar/cover_image_278_1475636648.jpg')", backgroundSize: "cover"}}>
                                                <div className="background-cover">
                                                </div>
                                                <div className="link-share visible-xs">
                                                    <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389" >
                                                        <i className="icon-svg svg-social-facebook"></i>
                                                    </a>
                                                    <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                        <i className="icon-svg svg-social-twitter"></i>
                                                    </a>
                                                    <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                        <i className="icon-svg svg-social-google"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    
                                      <div className="group-head">
                                        <div className="bt-info">
                                            <div className="img-left">
                                                <div className="avatar-user">
                                                                            <div className="img-thumbnail itemImage" style={{backgroundImage: "url(https://moki.vn/files/avatar/avatar_5389_1471401404.jpg)"}}></div>
                                                                    </div>
                                            </div>
                                            <div className="name-user">
                                                MK Shop            </div>
                                        </div>
                                        <div className="box-title hidden-xs">
                                            <div className="content-right">
                                                <ul>
                                                    <li>
                                                        <p>
                                                            <span className="color-title">
                                                                <i className="fa fa-shopping-bag"></i> Sản phẩm :
                                                            </span> 
                                                            <span className="total_product">
                                                                326                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-shopping-bag"></i> Người theo dõi:</span> 
                                                            <span className="total_product">
                                                                20                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>
                                                            <span className="color-title"><i className="fa fa-shopping-bag"></i> Đánh giá :</span> 
                                                            <span className="total_product">
                                                                31                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <div className="link-share">
                                                            <a href="http://www.facebook.com/share.php?u=https://moki.vn/shop/MK.Shop.5389">
                                                                <i className="fa fa-facebook "></i>
                                                            </a>
                                                            <a href="http://twitter.com/share?url=https://moki.vn/shop/MK.Shop.5389;text= Ghé thăm gian hàng của MK Shop trên ứng dụng mua sắm Moki" target="_blank">
                                                                <i    className="fa fa-twitter "></i>
                                                            </a>
                                                            <a href="https://plus.google.com/share?url=https://moki.vn/shop/MK.Shop.5389">
                                                                <i  className="fa fa-google "></i>
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                 </div>
                                 <div className="col-md-12">
                                     <div className="content-main">
                                            <div className="row">
                                                 <div className="col-md-3 col-xs-12">
                                                    <div className="fixMenu">
                                                        <div className="left-list">
                                                            <h3 className="text-box">Giới thiệu</h3>
                                                            <table className="table table-reflow">
                                                            <tbody><tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-shopping-bag"></i> Số sản phẩm
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">
                                                                            2,099                                            </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-users"></i> Người theo dõi
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">
                                                                            15   </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <span className="color-title"><i className="fa fa-calendar"></i> Tham gia</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="total_product">1 năm</span>
                                                                    </td>
                                                                </tr>
                                                                                                        <tr>
                                                                        <td>
                                                                            <span className="color-title"><i className="fa fa-location-arrow"></i> Khu vực</span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="total_product"> Hà Nội</span>
                                                                        </td>
                                                                    </tr>
                                                                                                    <tr>
                                                                    <td>
                                                                        <span className="color-title">
                                                                            <i className="fa fa-check-circle"></i> Tình trạng
                                                                        </span> 
                                                                    </td>
                                                                    <td>

                                                                        <span className="total_product">
                                                                            Online                                            </span>
                                                                    </td>
                                                                </tr>
                                                                <tr className="visible-xs">
                                                                    <td>
                                                                        <span className="color-title">
                                                                        <i className="fa fa-info-circle"></i> Status
                                                                        </span> 
                                                                    </td>
                                                                    <td>
                                                                    </td>
                                                                </tr>
                                                                <tr className="visible-xs">
                                                                    <td colSpan="2">
                                                                        <span className="status">
                                                                            Shop chuyên bán hàng cho mẹ và bé. Các SP đều được nhập chính hãng, có nguồn gốc xuất xứ rõ ràng nên các mom yên tâm nhé. Shop luôn sẵn sàng tư vấn nhiệt tình, vui lòng khách đến, vừa lòng khách đi. RẤT HÂN HẠNH ĐƯỢC PHỤC VỤ                                            </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        </div>
                                                        <div className="left-list">
                                                            <h3 className="text-box">Đánh giá gần đây</h3>
                                                            <aside>
                                                                <div className="comment">
                                                                <div className="item">
                                                                    <figure>
                                                                            <img className="commentor_avatar" src="https://moki.vn//moki/images/default-avatar.png" alt="Moki.vn - Ứng dụng mua bán trên di động | ZIN XaLa"/>
                                                                    </figure>
                                                                    <p className="text-a truncated" style={{wordWrap: "break-word"}}>
                                                                        rất tốt                                                    </p>
                                                                    <div className="sub-content">
                                                                        <span>Bởi</span> <a className="sub">ZIN XaLa</a> <span>lúc</span> <a className="sub">01:57 09-07-2017</a>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </aside>
                                                        </div>
                                                  </div>                 
                                             
                                        
                                        
                                        
                                        
                                        
                                                 </div> 
                                                 <div className="col-md-9">
                                                    <div className="status-user hidden-xs">
                                                            <div className="text-status">
                                                                Shop chuyên bán hàng cho mẹ và bé. Các SP đều được nhập chính hãng, có nguồn gốc xuất xứ rõ ràng nên các mom yên tâm nhé. Shop luôn sẵn sàng tư vấn nhiệt tình, vui lòng khách đến, vừa lòng khách đi. RẤT HÂN HẠNH ĐƯỢC PHỤC V<span className="moreellipses">...</span><span className="morecontent"><span>                        </span>
                                                                <a href="" className="readmorestatus">Đọc thêm</a>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className="title-product">
                                                        <h2>Sản phẩm của shop MK Shop</h2>
                                                        <hr />
                                                    </div>
                                                    <div className="product-user">
                                                            <div className="all-product">
                                                                <div className="product-row">
                                                                    <section>
                                                                        <div className="row">
                                                                             <div className="col-md-12">
                                                                             {
                                                                                this.state.data.map(function(item,index){
                                                                                    return(
                                                                                        <div key={index} style={{width:"33%",float:"left"}}>
                                                                                        <Product  src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  />
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
                                                 </div>
                                              
                                            </div>
                                     </div>
                                 </div>
                            </section>
                      </div>
                  </div>
              </div>
            
        )
    }
}

module.exports = connect(function(state){return{}})(shopMK);