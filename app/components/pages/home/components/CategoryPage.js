import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
class CategoryPage extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
            {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"},

            {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
            {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
    componentDidMount(){
        console.log('bugg');
        axios.get('http://192.168.20.119:1337/api/get_categories')
        .then(function(res){
            console.log(res.data);
        })
    } 
    render(){
        return(

            <div>
              
              {/* {this.props.url} */}
            
              {
                  this.state.data.map(function(item,index){
                      return(
                          <div key={index} style={{width:"33%",float:"left"}}>
                          <Product productId={item.productId}  src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  />
                          </div>
                      )

                  })
              }
            </div>
        )
       
    }
}
module.exports = CategoryPage;