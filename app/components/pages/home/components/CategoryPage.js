import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
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
        console.log('componentWillReceiveProps');
        console.log(nextProps.category_id);
         axios.post('/api/get_list_products',{category_id:nextProps.category_id})
         .then(function(res){
             console.log(res.data.data.products);
              that.setState({data:res.data.data.products});
           
         })
    }
    componentDidMount(){
        var that =this;
        console.log('bugg');
         axios.post('/api/get_list_products',{category_id:this.props.category_id})
         .then(function(res){
             console.log(res.data.data.products);
              that.setState({data:res.data.data.products});
           
         })
    } 
    render(){
        console.log(this.props.category_id);
        return(
             
            <div>
              
              {/* {this.props.url} */}
            
              {
                  this.state.data.map(function(item,index){
                      return(
                          <div key={index} style={{width:"33%",float:"left"}}>
                          <Product like={item.like} is_liked={item.is_liked} comment={item.comment} productId={item.id}  src={item.image.length>0?item.image[0].url:'../images/product1.jpg'} name={item.name} priceSale={item.price_percent} pre={item.price}  />
                          </div>
                      )

                  })
              }
            </div>
        )
       
    }
}
module.exports = CategoryPage;