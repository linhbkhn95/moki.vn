import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
// import {Router,Route,Switch} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
import {removeCart} from 'app/action/actionShoppingCart';
import Layout from './components/Layout.js';
import AccountSetting from './components/AccountSetting.js'
import AddressSetting from './components/AddressSetting.js'
import AccountInf from './components/AccountInf.js'
import ChangePass from './components/ChangePass.js'

import Order from './components/OrderManager.js';
class UserManager extends React.Component{
  
   
    render(){
        return(
       
            <div>
                <Layout>
                  
                    <div>
             
                      <Route exact path="/user_shop/manager" render={() => (
                            <h3>Please select a topic.</h3>
                            )}/>
                      <Route path="/user_shop/manager/accountsetting" component={AccountSetting} />
                      <Route path="/user_shop/manager/accountinf" component={AccountInf} />
                      <Route path="/user_shop/manager/changepass" component={ChangePass} />
                      <Route path="/user_shop/manager/addresssetting" component={AddressSetting} />
                      <Route  path="/user_shop/manager/test" render={() => (
                            <h3> select test.</h3>
                            )}/>
                      <Route  path="/user_shop/manager/order" component={Order} />
              
                    </div>
                </Layout>
           
             
           </div>
       )
    }
}

module.exports = UserManager;


{/* <div className="headings">
<h5 style={{fontWeight:"bold"}}>Đơn hàng của tôi</h5>
</div> */}