import React from 'react';
import LayoutStep from './components/LayoutStep.js';
import StepAddress from './components/StepAddress.js';
import StepPayment from './components/StepPayment.js';
import {Route} from 'react-router-dom';
class OrderStep extends React.Component{
    render(){
        return(
            <div style={{marginTop:"10px"}}>
               <LayoutStep>
                   
                 <div>
             
                      <Route exact path="/user/order/step" render={() => (
                            <h3>Please select a topic.</h3>
                            
                            )}/>
                      <Route path="/user/order/step/address" component={StepAddress} />
                      <Route path="/user/order/step/payment" component={StepPayment} />
                            
                    </div>
               </LayoutStep>
            </div>
        )
    }
}
module.exports = OrderStep;