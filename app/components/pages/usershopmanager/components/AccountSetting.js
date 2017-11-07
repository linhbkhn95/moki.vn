import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,Link} from 'react-router-dom';

import OrderProcess from './order/OrderProcess.js';
import OrderSuccess from './order/OrderSuccess.js';
import OrderFail from './order/OrderFail.js';
class AccountSetting extends React.Component{
  
   
    render(){
        return(
         
            
                   <div className="account-setting">
                      
                     
                    </div>
           
            
               
            
        )
    }
}

module.exports = AccountSetting;
