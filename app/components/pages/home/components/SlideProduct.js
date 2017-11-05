import React from 'react';
import Slider from'react-slick';

import Product from 'app/utils/Product.js'
class SlideProduct extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {productId:"6",src:"product6.jpg",name:"Giày đẹp",priceSale:"75,000",pre:"90,000"},
            {productId:"2",src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {productId:"3",src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {productId:"4",src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {productId:"5",src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
      
    render() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplay:true,
        slidesToShow: 3,
        Fade:true,
        slidesToScroll:1,
        centerMode:true //thừa 1 phần product
    };

        return(
                 <div className="product-population">
                    <h2>Sán phẩm ưu đãi nổi bật</h2>
                    <div className="product-population-item">
                    
                    <Slider {...settings}>
                        {this.state.data.map(function(item,index){
                                return(
                                <div key={index}><Product productId={item.productId} src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  /> </div>
                                )
                            })
                        } 
                        
                    </Slider>
                    </div>
                </div>
            )

   }
}

module.exports = SlideProduct;