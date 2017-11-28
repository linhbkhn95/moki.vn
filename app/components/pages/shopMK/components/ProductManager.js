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


import React from 'react';
import axios from 'axios';
// Import React Table
import ModalAddProduct from './product/ModalAddProduct.js';
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
      data: [
           {
               id:"DH123", name:"Giày tây", groupproduct:"Giày",total:"1,300,000 Vnđ"
               
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
               <div className="title-tab-admin-shop">Quản lý sản phẩm</div>
                {/* <CSVLink filename="Danh sách sách đơn hàng" data={this.state.data } style={prettyLink} >CSV ⬇</CSVLink> */}
               <button style={{marginTop:"36px"}} onClick={this.showModalAddProduct.bind(this)} className="btn btn-primary">Thêm sản phẩm</button>
                <ReactTable

                  columns={[


                  
                    
                    // {
                    //   Header:props =><div  className=" header-react-table">Stt</div>,
                    //   id: "shtk",
                    //   maxWidth:70,
                    //   sortable:false,
                    //   Filter: ({ filter, onChange }) => null,
                    //   accessor:"shtk"
                      
                    // },
                    {
                        Header:props =><div  className=" header-react-table">Mã sản phẩm</div>,
                        accessor: "id",
                        style:{textAlign:'center'},
                        maxWidth:150

                    },
                    {
                      Header:props =><div  className=" header-react-table">Tên sản phẩm</div>,
                      maxWidth:200,
                      style:{textAlign:'center'},
                      accessor: "name"

                    },
                   
                    {
                      Header:props =><div className=" header-react-table">Nhóm sản phẩm</div>,
                      accessor: "groupproduct",
                      style:{textAlign:'center'},
                      maxWidth:200
                    },
                  
                    {
                        Header:props =><div  className=" header-react-table">giá sản phẩm</div>,
                        maxWidth:200,
                        style:{textAlign:'center'},
                        accessor: "total"
  
                      },
                    {
                        Header:props =><div className=" header-react-table"> </div>,
                        maxWidth:200,
                        
                        sortable:false,
                        style:{textAlign:'center'},
                        Cell: (row) => (
                          <div>
                          <button style={{textAlign:"center"}} className="btn btn-info"   >Chi tiết </button>
                          <button style={{textAlign:"center"}} className="btn btn-danger"   >Xóa</button>
                          </div>
          
                      ),
          
                      Filter: ({ filter, onChange }) =>
                                null
          
          
          
                      }


                  ]}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  data={data}
                  noDataText="Không có kết quả!"
                  pages={pages} // Display the total number of pages
                  loading={loading} // Display the loading overlay when we need it
                  onFetchData={this.fetchData}

                  style={{
                    height: "300px" // This will force the table body to overflow and scroll, since there is not enough room
                  }}
                  //custom header css cho table
                  getTheadTrProps= {() =>{
                        return{
                          className:'primary'
                        }
                  }}
                  //  getTheadTdProps= {() =>{
                  //       return{
                  //         style:{color:'white'}
                  //       }
                  //  }}
                  filterable
                  pageText="Trang"
                  rowsText="dòng"
                  previousText="Trước"
                  nextText="Tiếp"
                  loadingText="Đang tải..."
                  ofText="của"
                  getTrProps={this.onRowClick}
                  defaultPageSize={5}
                  className="-striped -highlight"
                />
                <br />
                <ModalAddProduct show={this.state.showModalAddProduct} close={this.closeModalAddProduct.bind(this)}/>
             </div>
              )
            }
          
              
      
         
     
   

  }


module.exports  = TableDemo;
    //      onChange={this.fetchData} // Request new data when things change
