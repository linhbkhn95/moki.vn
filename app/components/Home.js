import React from 'react';
import {NavLink} from 'react-router-dom';

import Slider from'react-slick';



class Product extends React.Component{
  render(){
    return(
        <div className="product ">
            <div className="img-product"> 
                <a href> <img src={this.props.src} /></a>
           </div>
           <div className="name-product">
                <a href="">{this.props.name} </a>
           </div>
           
           <div className="vote">
           <i className="fa fa-star-o" aria-hidden="true"></i>
           <i className="fa fa-star-o" aria-hidden="true"></i>
           <i className="fa fa-star-o" aria-hidden="true"></i>
           <i className="fa fa-star-o" aria-hidden="true"></i>
            </div>
            <div className="price-product">
                <div className="price-sale">{this.props.priceSale}</div>
                <div className="price-pre">{this.props.pre}</div>
            </div> 
          </div>
     
    )
  }
}
class ListProduct extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data:["1","2","3"]
    };
  }
  
  render(){
       return(
          <div> 
            {this.state.data.map(function(item,index){
                return(
                  <Product key={index} />
                )
            })
           }
          
          </div>
       );
  }
}
class SimpleSlider extends React.Component {
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
      slidesToShow: 3,
      Fade:true,
      slidesToScroll:1,
      centerMode:true //thừa 1 phần product
    };
    return (
      <Slider {...settings}>
           {this.state.data.map(function(item,index){
                return(
                  <div><Product src={"../../images/"+item.src} name={item.name} priceSale={item.priceSale} pre={item.pre}  /> </div>
                )
            })
           } 
          
      </Slider>
    );
  }
 }
class Home extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data:[
        {parentId:1,GroupMenu:"Miễn phí",
         listItem:[
          
  
       ]},
        {parentId:2,GroupMenu:"Bé ăn",
         listItem:[
        {id: 1, NameMemu: 'Ghế ăn bột cho bé', link: '/',Component:"Home"},
        {id: 2, NameMemu: 'Bình sữa và  phụ kiện', link: '/',Component:"Home"}
  
  
        ]},
        {parentId:3,GroupMenu:"Bé mặc",
          listItem:[
         {id: 1, NameMemu: 'Giày dép thời trang', link: '/',Component:"Home"}
        ]},
       {parentId:4,GroupMenu:"Bé ngủ",
         listItem:[
        {id: 1, NameMemu: 'Giường ngủ - Giường tầng', link: '/',Component:"Home"},
         {id: 2, NameMemu: 'Nôi xác em bé', link: '/',Component:"Home"},
         {id: 3, NameMemu: 'Chăn đệm chiếu gối', link: '/',Component:"Home"}
       ]},
       {parentId:5,GroupMenu:"Bé tắm",
         listItem:[
        {id: 1, NameMemu: 'Chậu tắm phụ kiện', link: '/',Component:"Home"},
        {id: 2, NameMemu: 'Đo nhiệt độ tắm cho bé', link: '/',Component:"Home"}
      ]},
        {parentId:6,GroupMenu:"Bé vệ sinh",
          listItem:[
         {id: 1, NameMemu: 'Vệ sinh tay, tóc, chân, miệng', link: '/',Component:"Home"},
         {id: 2, NameMemu: 'Bỉm và tã giấy cho bé', link: '/',Component:"Home"}
       ]},
       {parentId:7,GroupMenu:"Bé khỏe - An toàn",
         listItem:[
        {id: 1, NameMemu: 'Dụng cụ hút mũi', link: '/',Component:"Home"},
        {id: 2, NameMemu: 'Cho bé uống thuốc', link: '/',Component:"Home"},
        {id: 3, NameMemu: 'Kem chống côn trùng', link: '/',Component:"Home"}
       ]}
      ]
     }
    
  }
  renderListMenuItem(listItem){
    console.log(listItem);
   if (listItem==="undefind"||listItem.length===0) {

      return null;


    } else {
        return(
          listItem.map(function(i,index){

          return(
            <li className="submenu-product"><NavLink  key={index} to={i.link}>{i.NameMemu} </NavLink></li>
            )
          })

    )
   }
  }
  render(){
    var that =this;
    return(
     
          <div className="container">
            <div className="row">

              <div className="col-md-3 left">
                  
                  <ul>
                  <li className="active header-menu-product" ><i className="fa fa-list" style={{paddingRight: "11px"}} aria-hidden="true"></i>Danh mục sản phẩm</li>
                   {this.state.data.map(function(item,itemindex){
                     return(
                    
                        <li>  <a href="#" data-toggle="collapse" data-target={"#"+item.parentId} data-parent="#sidenav01" className="collapsed"> {item.GroupMenu} <span className={item.listItem.length>0?"fa fa-angle-double-down":""}></span>
                        </a>
                        <div className="collapse" id={item.parentId} style={{height: "0px"}}>
                          <ul className="nav nav-list">
                            {that.renderListMenuItem(item.listItem)}
                          </ul>
                        </div>
                      </li>
                     )
                   })
                   }
                  
                  </ul>
                  <img className="banner" src="../../images/caidatmoki.jpg" alt=""/>
              </div>

              <div className="col-md-9 right">
                <img className="banner"  src="https://moki.vn/files/banner/banner_1497926374_35.png" alt=""/>
                <div className="row group_banner">
                  <div className="col-md-6">
                      <a href=""><img className="banner " src="../../images/lamsaodemuahang.jpeg" alt=""/></a>
                  </div>
                  <div className="col-md-6">
                      <a href="" ><img className="banner" src="../../images/bikip.jpg" alt=""/></a>
                  </div>

                </div>
                <div className="clearfix"></div>
                <div className="product-population">
                    <h2>Sán phẩm ưu đãi nổi bật</h2>
                    <div className="product-population-item">
                    
                    <SimpleSlider />
                    </div>
                </div>
              </div>
            
            </div>
        </div>
     
    )
  }
}
module.exports =  Home;
