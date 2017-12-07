import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import {connect} from 'react-redux';
class CategoryPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            // {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
            // {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            // {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            // {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            // {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},

            // {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
            // {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            // {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            // {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            // {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
    componentWillReceiveProps(nextProps){
        var that =this;
        
         axios.post('/api/get_new_products')
         .then(function(res){
             console.log(res.data.data.products);
              that.setState({data:res.data.data.products});
           
         })
    }
    componentDidMount(){
        var that =this;
    
         axios.post('/api/get_new_products')
         .then(function(res){
             console.log(res.data.data.products);
              that.setState({data:res.data.data.products});
           
         })
    } 
    render(){
        console.log(this.props.category_id);
        if(this.state.data &&this.state.data.length>0){
         return(
             
            <div style={{paddingTop:"20px"}} className="col-md-12">
              
            
            
              { 
                  this.state.data.map(function(item,index){
                      return(
                          <div key={index} className="col-md-12">
                          <Product like={item.like} is_liked={item.is_liked} comment={item.comment} productId={item.id}  src={item.image.length>0?item.image[0].url:'../images/product1.jpg'} name={item.name} priceSale={item.price_percent} pre={item.price}  />
                          </div>
                      )

                  })
                
              }
            </div>
        )
       }
       else{
           return (
               <div style={{textAlign:"center",paddingTop:"20px"}} className="col-md-12">Không có sản phẩm nào mới</div>
           )
            
       }
       
    }
}
module.exports = connect(function(state){
    return{
        
}})(CategoryPage);