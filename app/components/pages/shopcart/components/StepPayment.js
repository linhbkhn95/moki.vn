import React from 'react';
import {connect}from 'react-redux';
import {stepSuccess}from 'app/action/actionStepOrder.js';
import axios from 'axios';
import {resetCart} from 'app/action/actionShoppingCart.js';
class StepPayment extends React.Component{
    constructor(props){
        super(props);
        this.state = {

             lgShow: false,
             showModalDelete:false,
             productId_Del : null,
             total:0
        }
    }
    componentWillReceiveProps(nextStop){
        let total=0;
        let cart = nextStop.shoppingCart.cart;
          cart.map((product=>{
              total+=(product.quantity*parseInt(product.price));
          }))
       this.setState({total:total});
    }
    componentDidMount(){
        let total=0;
        let cart = this.props.shoppingCart.cart;
          cart.map((product=>{
              total+=(product.quantity*parseInt(product.price));
          }))
       this.setState({total:total});
    }
    renderCart(cart){
        var that= this;
        console.log(this.props);
         if(cart.length>0){
             console.log(cart);
             return(
                 cart.map(function(product,index){
                     
                     return(
                        <tr ng-repeat="productType in shoppingCartService.shoppingCart.productTypes | orderEnableProductType" className="ng-scope">
                            <td className="name" style={{whiteSpace:"normal; padding-left: 8px;"}}>
                                <p className="price ng-binding">{product.name} ({product.quantity})</p>
                            </td>
                            <td className="price text-right">
                                <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">{product.price}đ x {product.quantity}</p>
                                {/* <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">- 3,000đ</p> */}
                                <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountPromotionValue!=0">= {parseInt(product.price)*product.quantity}đ</p>
                            </td>
                            <td className="note">
                                <p ng-if="productType.totalPrice!=0" class="price ng-scope">&nbsp;</p>
                                {/* <p className="price ng-binding ng-scope" ng-if="productType.totalDiscountValue!=0">(KM 8%)</p> */}
                                <p className="price ng-scope" ng-if="productType.totalDiscountPromotionValue!=0"></p>
                        </td>    
                    </tr>
                     )
 
                 })
             )
         }
         else{
             return (
                 <div style={{paddingLeft:"20px",color:"#b3aa9e"}}>Không có sản phẩm nào được mua </div>
             )
         }
    }
    nextStep(){
                 var {dispatch} = this.props
                let data={};
                var cart = this.props.shoppingCart.cart.map((product)=>{
                        return {
                             product_id : product.product_id,
                             number : product.quantity
                        }
                })
                console.log(cart);
                data.order_detail = cart;
                data.city = "Hà Nội";
                data.phone = "01689952267";
                data.address = "Ngõ 1 Bùi Xương Trạch";
                axios.post('/api/buy_cart',data)
                .then((res)=>{
                    if(res.data.code==1000){
                        
                    }
                })
                dispatch(resetCart())
				dispatch(stepSuccess())
				this.props.history.push('/user/order/step/success')
	
		 
			
	}
    render(){
        var cart =this.props.shoppingCart.cart;
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
                <div className="col-md-6 ng-scope" ng-controller="PaymentController">
                    <div className="luachonphuongthucthanhtoan">
                        <div className="headings">
                            <h5>Lựa chọn hình thức thanh toán</h5>
                        </div>
                        {/* <input id="valueI" value="1" hidden=""/>
                        <input id="balanceI" hidden="" value="0"/> */}
                        <div role="tabpanel main-tabs">
                            
                            <ul className="nav nav-tabs" role="" id="payTypeSl">
                                <li style={{width:"100%"}}   className="col-md-12 active text-center">
                                    <a >
                                        
                                        <figure>
                                            <img src="../moki/themes/img/TIEN_MAT.png" alt=""/>
                                        </figure>
                                        <p>Thanh toán tiền mặt</p>
                                    </a>
                                </li>
                                {/* <li id="mokiPointLi" role="presentation" className="">
                                    <a data-id="2" href="#tab" className="text-center" aria-controls="tab" role="tab" data-toggle="tab">
                                       
                                        <figure><img src="../moki/themes/img/MOKI_POINT.png" alt=""/></figure>
                                        <p>Thanh toán bằng MOKI Point</p>
                                    </a>
                                </li> */}
                            </ul>
                           
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="home">
                                    <p>Bạn sẽ thanh toán bằng tiền mặt sau khi nhận hàng</p>
                                    <button className="btn btn-default text-right hidden-xs" onClick={this.nextStep.bind(this)}>Tiếp tục</button>
                                </div>
                                {/* <div role="tabpanel" className="tab-pane" id="tab">
                                    <p>Bạn sẽ thanh toán bằng Moki Coin</p>
                                    <button className="btn btn-default text-right  hidden-xs" ng-click="choicePayType()">Tiếp tục</button>
                                </div> */}
                            </div>
                            <div className="hidden-md hidden-lg hidden-sm choise-payment">
                                <button className="btn text-right" ng-click="choicePayType()">Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
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
                                <td colSpan="2" className="noname">
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
                                    {this.renderCart(cart)}

                           
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
                                    <p className="ng-binding">{this.state.total}đ</p>
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
module.exports = connect(function(state){return{stepOrder:state.stepOrder,shoppingCart:state.shoppingCart
}})(StepPayment);