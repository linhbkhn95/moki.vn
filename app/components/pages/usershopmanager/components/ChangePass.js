import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class ChangePass extends React.Component{
  
   
    render(){
        return(
         
            
                   <div>
                        <div className="order">
                            <div className="headings">
                            <h5 style={{fontWeight:"bold"}}>Đổi mật khẩu</h5>
                            </div>
                        </div>
                        
                     
                    </div>
           
            
               
            
        )
    }
}

module.exports = ChangePass;
