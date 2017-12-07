import React from 'react';
import axios from 'axios';
// Import React Table
import {Table} from 'react-bootstrap'
 class Demo extends React.Component{
    render(){
        return(
            <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Nhóm sản phẩm</th>
                <th>Số lượng</th>
                <th>Gía</th>
                <th>Ngày đăng</th>
              </tr>
            </thead>
            <tbody>
                {this.props.data.map((product,index)=>{
                    return(
                        <tr>
                        
                                        <td>{index+1}</td>
                                        <td>{product.code}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.number}</td>
                                        <td>{product.price}</td>

                                        <td>{product.created}</td>


                                      </tr>
                    )
                })}
                
              
            </tbody>
            </Table>
        )
    }
}

  module.exports = Demo;