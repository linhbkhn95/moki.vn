import React from 'react';
import axios from 'axios';
// Import React Table


import ReactTable from "react-table";
import "react-table/react-table.css";
import {Modal,Button,Checkbox, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
class ModalOrder extends React.Component{
    close(){
      this.props.close();
    }


    constructor() {
        super();
        this.state = {
            showModalAddProduct:false,
            showModalEditProduct:false,
          data: [
               {
                   id:"DH123", name:"Giày tây",quantity:2, groupproduct:"Giày",total:"1,300,000 Vnđ"
                   
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
    render(){
       const { data, pages, loading } = this.state;
      return (
        <Modal   show={this.props.show}
        onHide={this.close.bind(this)} 
        bsSize="large"
       aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div className="title-add-product col-md-4">Xử lý đơn hàng</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
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
                        Header:props =><div  className=" header-react-table">Số lượng</div>,
                        maxWidth:200,
                        style:{textAlign:'center'},
                        accessor: "quantity"
  
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
                          <button onClick={this.showModalEditProduct.bind(this)} style={{textAlign:"center",fontSize:"12px"}} className="btn btn-info"   >Phê duyệt</button>
                          <button style={{textAlign:"center",fontSize:"12px"}} className="btn btn-danger"   >Từ chối</button>
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
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalOrder;