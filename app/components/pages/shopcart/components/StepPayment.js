import React from 'react';
import {connect}from 'react-redux';
class StepPayment extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="background-cart">
            <div className="container"> 
              <div className="popup-danhgia">
                <form method="POST" enctype="multipart/form-data" id="form-rate">
                  <input type="text" name="purchase_id" id="purchase_id" hidden=""/>
                  <input type="text" name="rate" id="rate-input" value="0" hidden=""/>
                  <div className="row">
                   <div className="col-xs-4">
                     <figure className="choose-rate tot" data-rate="3">
                       <img id="img-status" src="/../moki/themes/img/tot.png" data-alt-src="/../moki/themes/img/tot-active.png" alt=""/>
                     </figure>
                   </div>
                   <div className="col-xs-4">
                     <figure className="choose-rate binhthuong" data-rate="2">
                       <img id="img-status" src="/../moki/themes/img/binhthuong.png" data-alt-src="/../moki/themes/img/binhthuong-active.png" alt=""/>
                     </figure>
                   </div>
                   <div className="col-xs-4">
                     <figure className="choose-rate xau" data-rate="1">
                       <img id="img-status" src="/../moki/themes/img/xau.png" data-alt-src="/../moki/themes/img/xau-active.png" alt=""/>
                     </figure>
                   </div>
                 </div>
                 <br/>
                 <div className="row">
                   <textarea name="content" id="content_id" className="form-control" maxlength="100" placeholder="Đánh giá giao dịch"></textarea>
                 </div>
                 <div className="row text-center nutdanhgia">
                   <button type="button" className="rate_content">Đánh giá người bán</button>
                 </div>
               </form>
             </div>
             <section className="popup-thongbao">
            
      <div className="content">
        <div className="khoitren">
          <figure>
            <img src="/../moki/themes/img/1.png" alt=""/>
          </figure>
          <p>Rất nhiều tính năng không thể thực hiện trên web, hãy <span>Download</span> app <span>MOKI</span> để có được sự <span>tiện lợi, thuận tiện.</span></p>
        </div>
        <div className="khoiduoi">
          <a id="linkios" href="http://bit.ly/moki_ios" target="_blank">
            <img src="/../moki/themes/img/appstore130.png" alt=""/>
          </a>
          <a id="linkandroid" href="http://bit.ly/moki_android" target="_blank">
            <img src="/../moki/themes/img/chplay130.png" alt=""/>
          </a>
          <a id="linkwindowphone" href="https://www.microsoft.com/vi-vn/store/p/moki-mua-ban-tren-di-%C4%90ong-cho-me-va-be/9nblggh4wz0j" target="_blank">
            <img src="/../moki/themes/img/windowphone130.png" alt=""/>
          </a>
        </div>
      </div>
    </section>         
    <div className="row">
        <section className="thanhtoan">
        <div className="container">
            <div className="row">
                <div className="col-md-8 ng-scope" ng-controller="PaymentController">
                    <div className="luachonphuongthucthanhtoan">
                        <div className="headings">
                            <h5>Lựa chọn hình thức thanh toán</h5>
                        </div>
                        {/* <input id="valueI" value="1" hidden=""/>
                        <input id="balanceI" hidden="" value="0"/> */}
                        <div role="tabpanel main-tabs">
                            
                            <ul className="nav nav-tabs" role="tablist" id="payTypeSl">
                                <li role="presentation" className="active text-center">
                                    <a data-id="1" href="#home" aria-controls="home" role="tab" data-toggle="tab">
                                        
                                        <figure>
                                            <img src="../moki/themes/img/TIEN_MAT.png" alt=""/>
                                        </figure>
                                        <p>Thanh toán tiền mặt</p>
                                    </a>
                                </li>
                                <li id="mokiPointLi" role="presentation" className="">
                                    <a data-id="2" href="#tab" className="text-center" aria-controls="tab" role="tab" data-toggle="tab">
                                       
                                        <figure><img src="../moki/themes/img/MOKI_POINT.png" alt=""/></figure>
                                        <p>Thanh toán bằng MOKI Point</p>
                                    </a>
                                </li>
                            </ul>
                           
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="home">
                                    <p>Bạn sẽ thanh toán bằng tiền mặt sau khi nhận hàng</p>
                                    <button className="btn btn-default text-right hidden-xs" ng-click="choicePayType()">Tiếp tục</button>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="tab">
                                    <p>Bạn sẽ thanh toán bằng Moki Coin</p>
                                    <button className="btn btn-default text-right  hidden-xs" ng-click="choicePayType()">Tiếp tục</button>
                                </div>
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm choise-payment">
                                <button className="btn text-right" ng-click="choicePayType()">Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="checkout_info_price ng-scope" ng-controller="ShoppingCartController">
        <div className="">
            <div className="headings">
                <h5>Thông tin đơn hàng </h5>
                
            </div>
            <div className="content content_card" style={{marginTop: "0px"}}>
                <div className="table-responsive">
                    <table className="table">
                        <thead id="tableheader">
                            <tr>
                                <td className="noname">
                                    <p className="text-left">Sản phẩm</p>
                                </td>
                                <td className="price">
                                    <p className="text-right">Giá</p>
                                </td>
                                <td className="note">
                                    <p className="text-right">Ghi chú</p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                           <tr ng-repeat="productType in shoppingCartService.shoppingCart.productTypes | orderEnableProductType" className="ng-scope">
                                <td className="name" style={{whiteSpace:"normal; padding-left: 8px;"}}>
                                    <p className="price ng-binding">Thìa thay thế ăn dặm 2/589</p>
                                </td>
                                <td className="price text-right">
                                    <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">40,000đ</p>
                                    <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">- 3,000đ</p>
                                    <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountPromotionValue!=0">= 37,000đ</p>
                                </td>
                                <td className="note">
                                    <p ng-if="productType.totalPrice!=0" class="price ng-scope">&nbsp;</p>
                                    <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">(KM 8%)</p>
                                    <p className="price ng-scope" ng-if="productType.totalDiscountPromotionValue!=0"></p>
                                </td>    
                            </tr>
                        </tbody>
                    </table>
                    <hr className="hidden-lg hidden-md hidden-sm line-hr"/>
                    <table className="lebta">
                        <thead id="tableheader">
                            <tr>
                                <td className="noname">
                                    <span className="col total">Tổng tiền<span className="vat">(Đã gồm VAT):</span></span>
                                </td>
                                <td className="price text-right price-colors">
                                    <p className="ng-binding">37,000đ</p>
                                </td>
                                <td className="price text-right price-colors">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <img src="/moki/themes/img/linhtinh.png" className="img-responsive"/></td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>			</div>
            </div>
        </div>
    </section>
            </div>
          </div>
        </div>
        )
    }
}
module.exports = connect(function(state){return{stepOrder:state.stepOrder}})(StepPayment);