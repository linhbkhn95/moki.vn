import React from 'react';
import Product from 'app/utils/Product.js'
class CategoryPage extends React.Component{
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
      
    render(){
        return(

            <div>
              
              {/* {this.props.url} */}
            
              {
                  this.state.data.map(function(item,index){
                      return(
                          <div key={index} style={{width:"33%",float:"left"}}>
                          <Product  src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  />
                          </div>
                      )

                  })
              }
            </div>
        )
       
    }
}
module.exports = CategoryPage;