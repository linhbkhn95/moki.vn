import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import Layout from 'app/components/pages/home/components/Layout.js';
import {setTitle}from 'app/action/actionTitlePage.js'
import { connect } from "react-redux";
class Search extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
           
          ]
        };
      }
    componentWillReceiveProps(nextProps){
        console.log('  componentWillReceiveProps(nextProps){')
        this.props.dispatch(setTitle("kết quả tìm kiếm"))
        console.log(nextProps)
    }
    componentDidMount(){
        var that =this;
        console.log('  componentDidMount(){')
        this.props.dispatch(setTitle("kết quả tìm kiếm"))
        console.log('bugg');
        console.log(this.props.keysearch)
         axios.post('/api/search',{keyword:this.props.keysearch})
         .then(function(res){
             console.log(res.data.data.products);
              that.setState({data:res.data.data.products});
           
         })
    } 
    render(){
        return(
         <Layout> 
            <div className="col-md-9 right">
              
              {/* {this.props.url} */}
            
              {
                  this.state.data.map(function(item,index){
                      return(
                          <div key={index} className="col-md-4">
                              <Product like={item.like} is_liked={item.is_liked} comment={item.comment} productId={item.id}  src={item.image.length>0?item.image[0].url:'../images/product1.jpg'} name={item.name} priceSale={item.price_percent} pre={item.price}  />
                          </div>
                      )

                  })
              }
            </div>
        </Layout>
        )
       
    }
}
module.exports = connect(function(state){

    return{}

})(Search);