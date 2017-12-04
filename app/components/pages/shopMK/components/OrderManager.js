// import React from 'react';
// import {connect} from 'react-redux';
// ;
// class OrderProcess extends React.Component{
  
   
//     render(){
//         return(
//               <section>
//                 <div className="">
//                     order  process
//                 </div>
//             </section>
            
//         )
// }

// module.exports = connect(function(state){return{shoppingCart:state.shoppingCart}})(OrderProcess);

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink} from 'react-router-dom';

import React from 'react';
import axios from 'axios';
// Import React Table
import ModalAddProduct from './product/ModalAddProduct.js';
import ModalEditProduct from './product/ModalEditProduct.js';


import OrderWait from './order/OrderWait.js';
import OrderFail from './order/OrderFails.js';

import OrderSuccess from './order/OrderSuccess.js';

import {Col, FormControl,Checkbox} from 'react-bootstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {CSVLink, CSVDownload} from 'react-csv';
//
// const requestData = (pageSize, page, sorted, filtered) => {

class TableDemo extends React.Component {
  constructor() {
    super();
    this.state = {
        showModalAddProduct:false,
        showModalEditProduct:false,
      data: [
           {
               id:"DH123", name:"Trịnh đức Bảo Linh", address:"Bùi xương trạch - Thanh xuân - Hà Nội",total:"1,300,000 Vnđ",date:"1/12/2017"
               
           }
      ],
      pages: null,
      // page:1,
      // pageSize:5,
      checkedAll:false,
      loading: false,
      checkboxChecked:false,
      selectedRows:new Set(),
      unSelectedRows:[]
    };
    this.fetchData = this.fetchData.bind(this);
  }
  showModalAddProduct(){
      this.setState({showModalAddProduct:true});
  }
  closeModalAddProduct(){
      this.setState({showModalAddProduct:false});
  }
  showModalEditProduct(){
    this.setState({showModalEditProduct:true});
  }
  closeModalEditProduct(){
      this.setState({showModalEditProduct:false});
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: false });
    var that =this;
    console.log(state);
    console.log(state.filtered);
    console.log(state.sorted);
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    //  axios.post('/userindex/search',{pagesize:state.pageSize,page:state.page+1,keySearch:state.filtered,sortSearch:state.sorted}

    // ).then(res => {
    //   console.log(res.data);
    //   // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
    //   that.setState({
    //     data: res.data.data,
    //     pages: res.data.numPerPage,
    //     loading: false,
    //     checkedAll:false
    //   });
    //   console.log(that.state);
    // });
  }
 fn(row){

    console.log(row);


 }
 onRowClick(state, rowInfo, column, instance){
    return {
        onDoubleClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
        }


    }
 }
 handleChangeALL(evt) {
  var that=this;
  this.setState({ checkedAll: evt.target.checked });
  if(evt.target.checked){
      that.state.data.map(function(item){
          if(!that.state.selectedRows.has(item.id)){
              that.state.unSelectedRows.push(item.id);
              that.state.selectedRows.add(item.id);
          }
      })
      that.setState({selectedRows:that.state.selectedRows,unSelectedRows:that.state.unSelectedRows})
    }
    else{
        that.state.unSelectedRows.map(function(item){
             that.state.selectedRows.delete(item);
        })
        that.setState({selectedRows:that.state.selectedRows,unSelectedRows:[]})
    }

}
 handleChange(row) {
   console.log(row);
  if(!this.state.selectedRows.has(row.original.id))
     this.state.selectedRows.add(row.original.id);
  else {
     this.state.selectedRows.delete(row.original.id);
  }
  this.setState({selectedRows:this.state.selectedRows });
}
  render() {
    const prettyLink  = {
        backgroundColor: '#8dc63f',
        fontSize: 14,
        fontWeight: 500,
        height: 52,
        padding: '0 48px',
        borderRadius: 5,
        color: '#fff'
      };
    const { data, pages, loading } = this.state;
   

       
          return(
             <div>
               <div className="title-tab-admin-shop">Quản lý đơn hàng</div>
               <div className="col-md-12 tab-order">
                                                        <ul className="s">
                                                  
                                                            <li role="presentation" ><NavLink to="/shop/admin/order/">Đơn hàng yêu cầu</NavLink> </li>
                                                            <li role="presentation"><NavLink to="/shop/admin/order/success">Đơn hàng đã xử  lý </NavLink> </li>
                                                            <li role="presentation"><NavLink to="/shop/admin/order/fail">Đơn hàng hủy</NavLink> </li>
                                                           
                                                            

                                                        </ul>
                                                    </div>  

                {/* <CSVLink filename="Danh sách sách đơn hàng" data={this.state.data } style={prettyLink} >CSV ⬇</CSVLink> */}
{/*                  
                <ul className="nav nav-pills">
  
  <li role="presentation" className=""><a href="#"> link</a></li>
  <li role="presentation" className=""><a href="#">Disabled link</a></li>
</ul> */}
                <Route exact path="/shop/admin/order/" component={OrderWait} />
                <Route exact path="/shop/admin/order/wait" component={OrderWait} />
                <Route path="/shop/admin/order/success" component={OrderSuccess} />
                <Route path="/shop/admin/order/fail" component={OrderFail} />
          
             </div>
              )
            }
          
              
      
         
     
   

  }


module.exports  = TableDemo;
    //      onChange={this.fetchData} // Request new data when things change
