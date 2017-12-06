var React = require('react');

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink,Link} from 'react-router-dom';


var {Provider} = require('react-redux');

var store = require('app/store.js');
var HomePage =require('app/components/Home.js');
var Layout = require('app/components/Layout.js');
 var Home = require('app/components/pages/home/Home.js');
var Login = require('app/components/pages/login/Login.js');
var ShopCart = require('app/components/pages/shopcart/ShopCart.js');
var ShopMK = require('app/components/pages/shopMK/ShopMK.js');
var UserManager = require('app/components/pages/usershopmanager/UserManager.js');
var CategoryPage = require('app/components/pages/home/components/CategoryPage.js');
var Search =       require('app/components/pages/search/Search.js');
import PrivateRoute from './PrivateRoute.js';
import OrderStep from  'app/components/pages/shopcart/OrderStep.js';
import AdminShop from  'app/components/pages/shopMK/AdminShop.js';

import DetailProduct from 'app/utils/DetailProduct.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';

import {logout}  from 'app/action/actionAuthenticate.js';
if(localStorage.jwToken){
  console.log('cssssssssssssssssssssssssssmm');
  setAuthorizationToken(localStorage.jwToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwToken)));
  
}
 class App extends React.Component{
 
// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
//require('style!css!sass!./css/style.scss');
// $(document).ready(() => $(document).foundation());
      componentDidMount(){
           
      }

     render(){
        return(
        
             <Provider store={store}>
              <Router>
                  <div>
                
                  {/* <Link to="/user/login">Đăng nhập</Link>  */}
                 
                
               
                   <Switch>
                
                      <Route  exact   path="/" component={HomePage}
                          />
                      {/* <Route  path="/home" component={Home}/> */}
                      <Route  path="/user/login" render={function(){
                          return<Layout><Login /></Layout>
                           }
                       } /> 
                        <Route  path="/shopCart" render={function(){
                          return<Layout><ShopCart /></Layout>
                           }
                       } /> 
                      {/* <Route  path="/shopCart" component={ShopCart} /> */}
                      <Route  path="/shopMK.:c.html"  render={function( {match}  ){
                           console.log(match)
                          return<Layout><ShopMK user_id={match.params.c}/></Layout>
                           }
                       } />
                      {/* <Route path="/product/:d" component={Home} />  */}
                      <PrivateRoute path="/user_shop/manager"  component={UserManager} />

                          
                          
                      <PrivateRoute path="/user/order/step"  render={function(){
                          return<Layout><OrderStep /></Layout>
                           }
                       } />
                      <Route path="/category" component={Home}/>
                      <Route path="/products/search.:key.html" render={function({match}){
                           console.log(match.params)
                          return<div><Search keysearch={match.params.key} /></div>
                           }
                       } />
                  
                       } />
                        <Route path="/shop/admin" component={AdminShop}/>


                        <Route render={function(){
                          return <p> sssssTrang không tồn stại</p>
                           }} />
                 </Switch>
              
             
               
                
                  
                   
              
               
               </div>
             </Router>
             </Provider>
        
     
    )
  }
}

module.exports = App;

