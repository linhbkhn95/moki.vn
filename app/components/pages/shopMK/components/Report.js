import React from 'react';
var Recharts  =require('recharts');
import axios from 'axios'
import {Modal,Button,Checkbox, FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import ReChart from './Recharts.js';
import DoanhThu from './Doanhthu.js';
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
            fromdate:'2017-01-01',
            throdate:'2018-01-01',
            startDate: null,
            finishDate:null,
            data :[],
            reportUrl:'/api/statistics_product_buy'
        };

      }
      _onChangeStart(event, value){
        // type date
        // if(event && value) {
        //   this.state.startDate = event;
        //  // this.setState(this.state);
        //  // this.props.onChange(this.props.name, event, this.props.type);
        // }
        // else{  // type else ex number, text...
        //     this.props.onChange(this.props.name, event, this.props.type);
        // }
    }
    _onChangeFinish(event, value){
        // type date
        // if(event && value) {
        //     console.log(event);
        //     console.log(value)
        // //  this.state.finishDate = event;
        //  // this.setState(this.state);
        //  // this.props.onChange(this.props.name, event, this.props.type);
        // }
        // else{  // type else ex number, text...
        //     this.props.onChange(this.props.name, event, this.props.type);
        // }
    }
    handleCatChange(e) {
        this.setState({
            reportUrl: e.target.value
        })
        console.log(this.state.reportUrl)
    }
    report(){
        let type = this.state.reportUrl;
        let that =this;
        console.log(type);
        // let startDate = this.state.startDate.value;
        // let finishDate = this.state.finishDate.value;
       // console.log(startDate +' ' +finishDate)
        axios.post(type,{fromdate:this.state.fromdate,thrudate:this.state.throdate})
        .then((res)=>{
            console.log(res);
            if(res.data.code==1000){
                console.log(res.data.data);
                that.setState({data:res.data.data});
            }
        })
    }
    render(){
        return(
            <div className="col-md-12">
                     <div className="title-tab-admin-shop">Thống kê báo cáo</div>
                   <div className="col-md-4">
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Chọn thống kê</ControlLabel>
                        <FormControl  onChange={this.handleCatChange.bind(this)} ref="type" componentClass="select" placeholder="Thống kê theo">
                            <option value="/api/statistics_product_buy">Sản phẩm bán chạy</option>
                            <option value="/api/statistics_shop_revenue">Doanh thu </option>
                            <option value="/api/statistics_user_buy">Top người dùng mua thường xuyên</option>
                            <option value="/api/statistics_product_like">Sản phẩm yêu thích</option>
                            <option value="/api/statistics_product_inventory">Sản phẩm tồn kho</option>
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
                            <div style={{textAlign:"center",paddingTop:"20px"}}><button onClick={this.report.bind(this)} className="btn btn-lg btn-primary">Xem Thống kê</button></div>
                    </div>
                    <div className="col-md-12">
                          
                          <div style={{display:this.state.reportUrl=='/api/statistics_product_inventory'? 'block':'none'}} >  <ReChart data={this.state.data} /> </div>
                          <div style={{display:this.state.reportUrl=='/api/statistics_shop_revenue'?'block':'none'}} >  <DoanhThu  data = {this.state.data} /> </div>

                    </div>
            </div>
        )
    }
}
module.exports = Report;