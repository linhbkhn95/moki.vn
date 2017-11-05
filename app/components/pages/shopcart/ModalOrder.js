import React from 'react';
import {Modal,Button, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
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

    render(){
      return (
        <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div className="title-order">Đơn đặt mua hàng</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
                    <div className="col-md-12">
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Tên người đặt"
                            placeholder="Nhập tên của bạn..."
                        />
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Số điện thoại liên hệ"
                            placeholder="nhập số điện thoại..."
                        />
                    </div>
                    <div className="col-md-12">
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Địa chỉ người đặt"
                            placeholder="Nhập địa chỉ bạn muốn giao hàng..."
                        />
                      
                    </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };
  
  module.exports = ModalOrder;