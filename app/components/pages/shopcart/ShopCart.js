import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {removeCart} from 'app/action/actionShoppingCart';

import ModalOrder from './ModalOrder.js';
import ModalDeleteProduct from './components/ModalDeleteProduct.js';
class shoppingCart extends React.Component{
    constructor(props){
        super(props);
        this.state = {

             lgShow: false,
             showModalDelete:false,
             productId_Del : null

        }
    }
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
   removeProduct(productId){
      console.log('remove product'+productId);
      this.setState({showModalDelete:true,productId_Del:productId});

   //   this.props.dispatch(removeCart(productId));
   }
   showOrder(){
       this.setState({lgShow:true});
   }
   access(){
        console.log('dy');
        if(this.state.productId_Del!=null){
            this.props.dispatch(removeCart(this.state.productId_Del));
        }
          
        this.setState({showModalDelete:false,productId_Del:null});
   }
   renderCart(cart){
       var that= this;
       console.log(this.props);
        if(cart.length>0){
            console.log(cart);
            return(
                cart.map(function(product,index){
                    return(
                    <tr key={index} className="ng-scope">
                        <td className="name">
                            <a href="../san-pham/Thia-thay-the-binh-Lovi-9234.html">
                               <img className="img-responsive btn-block ng-scope" src="../../images/anhbe.jpg" />
                                
                            </a>
                        </td>
                        <td className="noname">
                            <p className="name ng-binding">{product.nameProduct}</p>

                            <p className="shopname">Shop <a href="/shop/momo" className="ng-binding">{product.shopMK}</a></p>
                        </td>
                        <td className="price">
                            <p className="price ng-binding">42,000đ</p>
                         <p className="ori_price ng-scope"><s><span className="line ng-binding">{product.price +"đ"}</span></s>&nbsp;&nbsp;&nbsp;<span className="percent ng-binding">KM 8%</span>
                                </p>
                            </td>  
                            <td className="coupon">
                               <input id="codeI9234"  className="form-control ng-pristine ng-untouched ng-valid ng-scope ng-empty" type="text" placeholder="Mã khuyến mại" />
                            
                            </td>
                            <td onClick={that.removeProduct.bind(that,product.productId)}  className="del"><i style={{cursor:"pointer"}}  className="fa fa-times" aria-hidden="true"></i></td> 
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
    render(){
        console.log('aa');
        var cart =this.props.shoppingCart.cart;

        let lgClose = () => this.setState({ lgShow: false });
        let closeModalDelete = () => this.setState({ showModalDelete: false });
        
        return(
                <section className="cart">
                  <div className="container">
                    <div className="row">    
                        <div className="col-md-8">
                          <div className="product_list">
                            <div className="headings">
                                <h5>Giỏ hàng của tôi </h5>
                                <span className="number ng-binding">( {this.props.shoppingCart.count}/{this.props.shoppingCart.count} sản phẩm mua được)</span>
                            </div>
                            <div className="content">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead id="tableheader">
                                            <tr>
                                                <td colSpan="2"><p>Sản phẩm</p></td>
                                                <td className="price">
                                                    <p>Giá</p>
                                                </td>
                                                <td className="coupon">
                                                    <p>Mã khuyến mại</p>
                                                </td>
                                                <td className="del"></td>
                                            </tr>
                                        </thead>
                                             <tbody className="ng-scope">
                                              {this.renderCart(this.props.shoppingCart.cart)}
                                                
                                            </tbody>
                                        </table>
        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                                <div className="checkout">
                                    <div className="headings">
                                        <h5>Thông tin đơn hàng</h5>
                                    </div>
                                    <div className="content">
                                        <div className="table_price">
                                            <div className="table_price_row row1">
                                                <span className="col">Tạm tính:</span>
                                                <span className="col text-right ng-binding">45,000 đ</span>
                                            </div>
                                            <div className="table_price_row row2">
                                            <span className="col">Khuyến mại:</span>
                                            <span className="col text-right ng-binding ng-scope" >-3,000đ</span>
                                            
                                        </div>
                                        </div>
                                        <div className="table_price table_price2">
                                            <div className="table_price_row row1">
                                                <span className="col total">Tổng <span className="vat">(Đã bao gồm VAT):</span></span>
                                                <span className="col text-right ng-binding">43,000 đ</span>
                                            </div>
                                        </div>
                                        <div className="checkoutnow text-center">
                                            <button id="paymentBt" onClick={this.showOrder.bind(this)} className="btn btn-default text-right"  disabled={cart.length ?"":"disabled"}>Đặt hàng</button>
                                            <a href="/">Tiếp tục mua hàng</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
                <ModalOrder show={this.state.lgShow} onHide={lgClose} />
                <ModalDeleteProduct show={this.state.showModalDelete} onHide={closeModalDelete} access ={this.access.bind(this)} />
            </section>
            
        )
    }
}

module.exports = connect(function(state){return{shoppingCart:state.shoppingCart}})(shoppingCart);
