import React from 'react';
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
    render(){
      return (
        <Modal   show={this.props.show}
        onHide={this.close.bind(this)} 
        bsSize="large"
       aria-labelledby="contained-modal-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg"><div className="title-add-product col-md-4">Thêm sản phẩm</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
                    <div className="col-md-12">
                        <div className="title-moduleadd-product" >Mô tả sản phẩm</div>
                        <div className="col-md-12">
                          <div className="col-md-7">
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Tên sản phẩm"
                                placeholder="Nhập tên sản phẩm..."
                            />
                          </div>
                          <div className="col-md-3">
                          <FieldGroup
                              id="formControlsText"
                              type="number"
                              label="Giá sản phẩm"
                              placeholder="nhập gía sản phẩm..."
                              help="(VNĐ)"
                          />
                        
                        </div>
                      <div className="col-md-12">
                       
                            <FieldGroup
                            id="formControlsFile"
                            type="file"
                            label="Ảnh sản phẩm"
                            help="Chọn ảnh sản phẩm để đăng bán"
                            />
                       
                      </div>
                      </div>
                        <div className="col-md-12">
                          <div className="col-md-12">
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Mô tả sản phẩm</ControlLabel>
                          <FormControl componentClass="textarea" placeholder="Nhập mô tả về sản phẩm cuả bạn..." />
                          </FormGroup>
                            </div>
                          
                        </div>
                      <div className="col-md-12 ">
                          <div className="col-md-12 col-md-push-1">
                            <FormGroup>
                            <Checkbox inline>
                              Miễn phí
                            </Checkbox>
                            {' '}
                            <Checkbox inline>
                              Bán nhanh
                            </Checkbox>
                            {' '}
                            <Checkbox inline>
                              Cho phép mặc cả
                            </Checkbox>
                          </FormGroup>
                        </div>
                      <div>
                     
                      </div>
                    </div>
                    </div>
                    <div className="col-md-12">
                      <div className="title-moduleadd-product">Chi tiết sản phẩm</div>
                       <div className="col-md-12">
                        <div className="col-md-7">
                          <FormGroup controlId="formControlsSelect">
                              <ControlLabel>Danh mục sản phẩm</ControlLabel>
                              <FormControl componentClass="select" placeholder="chọn danh mục">
                                <option value="select">Mũ </option>
                                <option value="other">Quần tây</option>
                              </FormControl>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Trạng thái</ControlLabel>
                                <FormControl componentClass="select" placeholder="chọn danh mục">
                                  <option value="select">Đóng </option>
                                  <option value="other">Đang bán</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                       </div>
                    </div>
                    <div className="col-md-12">
                    <div className="title-moduleadd-product">Vận chuyển</div>
                     <div className="col-md-12">
                      
                      <div className="col-md-12">
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Nơi bán</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Nhập nơi bán của bạn.." />
                            </FormGroup>
                        </div>
                       </div>
                       
                    </div>
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