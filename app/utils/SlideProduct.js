import React from 'react';
import Slider from'react-slick';

import Product from 'app/utils/Product.js'
class SlideProduct extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {src:"product1.jpg",name:"Thìa Thay Thế",priceSale:"75,000",pre:"90,000"},
            {src:"product2.jpg",name:"Hút Mũi Cana",priceSale:"75,000",pre:"90,000"},
            {src:"product3.jpg",name:"Ty Giả",priceSale:"75,000",pre:"90,000"},
            {src:"product4.jpg",name:"Vòi phun nước",priceSale:"75,000",pre:"90,000"},
            {src:"product5.jpg",name:"Thìa Vét",priceSale:"75,000",pre:"90,000"}
          ]
        };
      }
      
    render() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplay:true,
        slidesToShow:4,
        Fade:true,
        slidesToScroll:1
        //centerMode:true //thừa 1 phần product
    };

        return(
                 <div className="product-population">
                   
                    <Slider {...settings}>
                        {this.state.data.map(function(item,index){
                                return(
                                <div key={index}><Product src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  /> </div>
                                )
                            })
                        } 
                        
                    </Slider>
                  
                </div>
            )

   }
}

module.exports = SlideProduct;