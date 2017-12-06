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
        
        };
      
      }
    
      
    render(){
       const { data, pages, loading } = this.state;
      return (
        <Modal   show={this.props.show}
        onHide={this.close.bind(this)} 
        bsSize="large"
       aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div className="title-add-product col-md-4">Chi tiết đơn hàng</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">

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