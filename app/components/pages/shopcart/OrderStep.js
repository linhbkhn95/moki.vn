import React from 'react';
import LayoutStep from './components/LayoutStep.js';
import StepAddress from './components/StepAddress.js';
import StepPayment from './components/StepPayment.js';
import StepSuccess from './components/StepSuccess.js';
var LayoutMain = require('app/components/Layout.js');

import {Route} from 'react-router-dom';
import {connect}from 'react-redux';
class OrderStep extends React.Component{
    componentWillMount(){

    }
    render(){
        return(
            <LayoutMain>
            <div style={{marginTop:"10px"}}>
              
               <LayoutStep>
                   
                 <div>
             
                      <Route exact path="/user/order/step" render={() => (
                            <h3>Please select a topic.</h3>
                            
                            )}/>
                      <Route path="/user/order/step/address" component={StepAddress} />
                      <Route path="/user/order/step/order_info"  component={StepPayment} />
                      <Route path="/user/order/step/success"  component={StepSuccess} />
                            
                    </div>
               </LayoutStep>
            
            </div>
            </LayoutMain>
        )
    }
}
module.exports =OrderStep;