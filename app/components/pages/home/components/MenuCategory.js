import React from 'react';
import {Link} from 'react-router-dom';
class MenuCategory extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          data:[
            {parentId:1,GroupMenu:"Miễn phí",
             listItem:[
              
      
           ]},
            {parentId:2,GroupMenu:"Bé ăn",
             listItem:[
            {id: 1, NameMemu: 'Ghế ăn bột cho bé', link: '/be',Component:"Home"},
            {id: 2, NameMemu: 'Bình sữa và  phụ kiện', link: '/login',Component:"Home"}
      
      
            ]},
            {parentId:3,GroupMenu:"Bé mặc",
              listItem:[
             {id: 1, NameMemu: 'Giày dép thời trang', link: '/ba',Component:"Home"}
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
     
       if (listItem==="undefind"||listItem.length===0) {
    
          return null;
    
    
        } else {
            return(
              listItem.map(function(i,index){
    
              return(
                <li key={index}  className="submenu-product"><Link  to={i.link}>{i.NameMemu} </Link></li>
                )
              })
    
        )
       }
    }

    render(){
        var that=this;
         return(

            
            <ul>
                    <li className="active header-menu-product" ><i className="fa fa-list" style={{paddingRight: "11px"}} aria-hidden="true"></i>Danh mục sản phẩm</li>
                    {this.state.data.map(function(item,itemindex){
                    return(
                    
                        <li key={itemindex} >  <a href="#" data-toggle="collapse" data-target={"#"+item.parentId} data-parent="#sidenav01" className="collapsed"> {item.GroupMenu} <span className={item.listItem.length>0?"fa fa-angle-double-down":""}></span>
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
         )
    }
}

module.exports = MenuCategory;