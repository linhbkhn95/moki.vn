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
class Report extends React.Component{
    render(){
        return(
            <div className="col-md-12">
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Chọn thống kê</ControlLabel>
                        <FormControl componentClass="select" placeholder="Thống kê theo">
                            <option value="select">Sản phẩm</option>
                            <option value="other">Doanh thu</option>
                            <option value="select">Sản phẩm</option>
                            <option value="other">Doanh thu</option>
                        </FormControl>
                        </FormGroup>
            </div>
        )
    }
}
module.exports = Report;