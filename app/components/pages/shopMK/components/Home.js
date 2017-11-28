import React from  'react';
import Product from 'app/utils/Product.js'

class Home extends React.Component{
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
                
                  <div className="status-user hidden-xs col-md-12">
                                                            <div className="text-status">
                                                                Shop chuyên bán hàng cho mẹ và bé. Các SP đều được nhập chính hãng, có nguồn gốc xuất xứ rõ ràng nên các mom yên tâm nhé. Shop luôn sẵn sàng tư vấn nhiệt tình, vui lòng khách đến, vừa lòng khách đi. RẤT HÂN HẠNH ĐƯỢC PHỤC V<span className="moreellipses">...</span><span className="morecontent"><span>                        </span>
                                                                <a href="" className="readmorestatus">Đọc thêm</a>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className="title-product">
                                                        <h2>Sản phẩm của shop MK Shop</h2>
                                                        <hr />
                                                    </div>
                                                    <div className="product-user">
                                                            <div className="all-product">
                                                                <div className="product-row">
                                                                    <section>
                                                                        <div className="row">
                                                                             <div className="col-md-12">
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
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                    </div>
            </div>
        )
    }
}
module.exports =Home;