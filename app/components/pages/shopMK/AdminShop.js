import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import Product from 'app/utils/Product.js'
import Layout from './components/Layout.js';

import Home from './components/Home.js';

import OrderManager from './components/OrderManager.js';

import ProductManager from './components/ProductManager.js';

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink} from 'react-router-dom';
class AdminShop extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
            {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},
            {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
            {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        return(
             
              <Layout>
                  <Route exact path="/shop/admin" component={Home}/>
                  <Route  path="/shop/admin/product" component={ProductManager}/>
                  <Route  path="/shop/admin/order" component={OrderManager}/>
              </Layout>
            
        )
    }
}

module.exports = connect(function(state){return{}})(AdminShop);