import React from 'react';
import {Modal,Button,Checkbox, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class ProfileManager extends React.Component{
    render(){
        return(
            <div className="profile-manager">
               <div className="title-tab-admin-shop">Quản lý tài khoản</div>
               <div className="col-md-12">
               <div className="title-moduleadd-product" >Thông tin chủ cửa hàng</div>
               <div className="col-md-12">
                 <div className="col-md-6">
                   <FieldGroup
                       id="formControlsText"
                       type="text"
                       label="Tên đầy đủ"
                       placeholder="Nhập tên của bạn..."
                   />
                 </div>
                 <div className="col-md-6">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Quê quán"
                        placeholder="nhập địa chỉ cửa hàng..."
                       
                    />
               
               </div>
               <div className="col-md-6">
                   <FieldGroup
                       id="formControlsText"
                       type="text"
                       label="Sdt"
                       placeholder="Nhập số điện thoại..."
                   />
                 </div>
                 <div className="col-md-6">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Email"
                        placeholder="nhập email..."
                       
                    />
               
               </div>
               <div className="col-md-6">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Số chứng minh thư nhân dân"
                        placeholder="nhập sô chứng minh thư nhân dân..."
                       
                    />
               
               </div>
               
               
            
             <div>
            
             </div>
           </div>
          
           <div className="title-moduleadd-product">Thông tin cửa hàng</div>
            <div className="col-md-12">
                 <div className="col-md-6">
                   <FieldGroup
                       id="formControlsText"
                       type="text"
                       label="Tên cửa hàng"
                       placeholder="Nhập tên của cửa hàng..."
                   />
                 </div>
                 <div className="col-md-6">
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Địa chỉ"
                        placeholder="nhập địa chỉ cửa hàng..."
                       
                    />
               
               </div>
              
               <div className="col-md-12">
               <FormGroup controlId="formControlsTextarea">
                 <ControlLabel>Mô tả cửa hàng</ControlLabel>
               <FormControl componentClass="textarea" placeholder="Nhập mô tả về cửa hàng cuả bạn..." />
               </FormGroup>
         
               
             </div>
             <div className="col-md-12">
             
                  <FieldGroup
                  id="formControlsFile"
                  type="file"
                  label="Ảnh đại diện"
                  help="Chọn ảnh đại diện cho cửa hàng"
                  />
             
            </div>
             
              <div className="col-md-12">
             
                  <FieldGroup
                  id="formControlsFile"
                  type="file"
                  label="Ảnh bìa"
                  help="Chọn ảnh bìa cho cửa hàng"
                  />
             
            </div>
            
            </div>  
            <div className="col-md-12"><div className="pull-right" ><button className="btn btn-primary">Lưu thay đổi</button></div></div>
           </div>
            </div>
        )
    }
}
module.exports =ProfileManager;