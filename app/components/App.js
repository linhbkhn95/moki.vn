var React = require('react');

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink,Link} from 'react-router-dom';


var {Provider} = require('react-redux');

var store = require('app/store.js');
var Test =require('app/components/Test.js');
var Layout = require('app/components/Layout.js');
 var Home = require('app/components/pages/home/Home.js');
var Login = require('app/components/pages/login/Login.js');
var ShopCart = require('app/components/pages/shopcart/ShopCart.js');
var ShopMK = require('app/components/pages/shopMK/ShopMK.js');
import DetailProduct from 'app/utils/DetailProduct.js';
 class App extends React.Component{

// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
//require('style!css!sass!./css/style.scss');
// $(document).ready(() => $(document).foundation());
 
     render(){
        return(
        
             <Provider store={store}>
              <Router>
                  
                  <Layout>
                  {/* <Link to="/user/login">Đăng nhập</Link>  */}
                 
                 <div>
               
                   <Switch>
                       
                      <Route  exact   path="/" component={Home}/>
                      <Route  path="/user/login" component={Login} />
                      <Route  path="/shopCart" component={ShopCart} />
                      <Route  path="/shopMK" component={ShopMK} />
                      <Route path="/product/:d" component={Home} /> 
                      <Route render={function(){
                          return <p> not found</p>
                           }
                       } />
                 </Switch>
                </div>
               </Layout>
             </Router>
             </Provider>
        
     
    )
  }
}

module.exports = App;

