import React from 'react';
import Product from 'app/utils/Product.js'
import axios from 'axios';
import Layout from 'app/components/pages/home/components/Layout.js';
class Search extends React.Component{
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
        console.log('  componentWillReceiveProps(nextProps){')
        console.log(nextProps)
    }
    componentDidMount(){
        var that =this;
        console.log('  componentDidMount(){')
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
module.exports = Search;