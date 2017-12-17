import React from 'react';
import {Link} from 'react-router-dom';
import{connect} from 'react-redux';
import {setStepCurrent}from 'app/action/actionStepOrder.js';
var data=[
   
     {
        step:2, url:"/user/order/step/address",name:"2. Chọn địa chỉ",

     },
     
   
    {
       step:3, url:"/user/order/step/order_info",name:"3. Xác nhận",

        
    },
    {
        step:4, url:"/user/order/step/success",name:"4. Hoàn thành",
        
         
     }
]
class Layout extends React.Component{
    clickStep(step){
        this.props.dispatch(setStepCurrent(step));
    }
    renderLayout(stepOrder){
          var that=this;
          return(
             data.map((i,index)=>{
                if(stepOrder.step>=i.step){
                    return(
                        <li onClick={that.clickStep.bind(that,i.step)} key={index} data-target="step-2" className={stepOrder.current==i.step?"current":""}>
                            <Link to={i.url}>
                                <span className="number">{i.name}</span>
                            </Link>
                     </li>   
                    )
                }
                else{
                  return(  <li key={index} data-target="step-5" className="">
                       <span className="number">{i.name}</span>
                  </li>)
                }
            })
        
        )
    }
    render(){
        var stepOrder = this.props.stepOrder;
        return(
             <section className="hidden-sm hidden-xs progressbar">
                <div className="reg-step">
                    <div className="container">
                       
                        <ul className="register-step active  ">
                             <li className="" data-target="step-1">
                                 <span className="number">1. Đăng nhập</span>
                            </li>
                            {/* <li data-target="step-2" className="current">
                                <Link to="/user/order/step/address">
                                    <span className="number">2. Chọn địa chỉ</span>
                                </Link>
                            </li>
                            <li data-target="step-3" className="">
                                <a href="/user/order/step/payment">
                                    <span className="number">3. Thanh toán</span>
                                </a>
                            </li>
                            <li data-target="step-4" className="">
                                <a href="/ShoppingCarts/order_info">
                                    <span className="number">4. Xác nhận</span>
                                </a>
                            </li>
                            <li data-target="step-5" className="">
                                <span className="number">5. Hoàn thành</span>
                            </li>  */}
                            {this.renderLayout(stepOrder)}
                        </ul>
                     
                    </div>
                    <div className ="container">
                         <div className="col-md-12">
                             {this.props.children}
                         </div>
                    </div>
                </div>
            </section>
        )
    }
}
module.exports = connect(function(state){return{stepOrder:state.stepOrder}})(Layout);