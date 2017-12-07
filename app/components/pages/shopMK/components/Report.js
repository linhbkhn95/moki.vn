import React from 'react';
var Recharts  =require('recharts');

import {Modal,Button,Checkbox, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

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
    constructor(props){
        super(props);
        this.state = {
            startDate: null,
            finishDate:null,
        };

      }
      _onChangeStart(event, value){
        // type date
        if(event && value) {
          this.state.startDate = event;
          this.setState(this.state);
         // this.props.onChange(this.props.name, event, this.props.type);
        }
        else{  // type else ex number, text...
            this.props.onChange(this.props.name, event, this.props.type);
        }
    }
    _onChangeFinish(event, value){
        // type date
        if(event && value) {
          this.state.finishDate = event;
          this.setState(this.state);
         // this.props.onChange(this.props.name, event, this.props.type);
        }
        else{  // type else ex number, text...
            this.props.onChange(this.props.name, event, this.props.type);
        }
    }
    render(){
        return(
            <div className="col-md-12">
                     <div className="title-tab-admin-shop">Thống kê báo cáo</div>
                   <div className="col-md-4">
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Chọn thống kê</ControlLabel>
                        <FormControl componentClass="select" placeholder="Thống kê theo">
                            <option value="/">Sản phẩm bán chạy</option>
                            <option value="/">Doanh thu </option>
                            <option value="/">Top người dùng mua thường xuyên</option>
                            <option value="/">Sản phẩm yêu thích</option>
                            <option value="/">Sản phẩm tồn kho</option>
                        </FormControl>
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                    <div className="col-md-6">
                                <h5 className="col-xs-5">Từ ngày</h5>
                                <div className="col-xs-6 col-xs-pull-1">
                                <DatePicker dateFormat="DD/MM/YYYY" className="form-control" selected={this.state.startDate}
            placeholder="12/12/2017" onChange={this._onChangeStart.bind(this)} />

                                </div>
                    </div>
                    <div className="col-md-6">
                                <h5 className="col-xs-5">Đến ngày</h5>
                                <div className="col-xs-6 col-xs-pull-1">
                                <DatePicker dateFormat="DD/MM/YYYY" className="form-control" selected={this.state.finishDate}
            placeholder="12/12/2017" onChange={this._onChangeFinish.bind(this)} />

                                </div>
                    </div>
                    </div>
                    <div className="col-md-12">
                            <div style={{textAlign:"center",paddingTop:"20px"}}><button className="btn btn-lg btn-primary">Xem Thống kê</button></div>
                    </div>
            </div>
        )
    }
}
module.exports = Report;