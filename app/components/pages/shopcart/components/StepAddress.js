import React from 'react';
import {NavLink}from 'react-router-dom'
import {connect}from 'react-redux';
import {setAddress}from 'app/action/actionStepOrder.js';

class StepAddress extends React.Component{
	constructor(props){
		super(props);
		this.state={
			 
			 display:'none'
		}
	}
    onSiteChanged(e) {
		this.setState({
		   display:'block'
		  });
	  }
	  onAddressChanged(e) {
		this.setState({
		 
		  display:"none"
		  });
	  }
	nextStep(){
		var {dispatch} = this.props
		  if(this.state.display=="none"){
				dispatch(setAddress("tesst"))
				this.props.history.push('/user/order/step/order_info')
		  }
		  else{
			dispatch(setAddress("khac"))
			this.props.history.push('/user/order/step/order_info')
		  }
			
	}
    render(){
        return(
			<div className="background-cart">
            <div className="checkout">
				<div className="container">
                <div className='col-md-8 col-md-offset-2'>   
                    <div className="checkout_info_price" style={{paddingTop: '10px'}}>
					<div className="headings">
						<h5>Xin vui lòng chọn địa chỉ để nhận hàng</h5>
					</div>
					<form action="/ShoppingCarts/checkout" className="form-horizontal ng-pristine ng-valid" id="addressForm" method="post"><div style={{display:"none"}}><input type="hidden" name="_method" value="POST"/></div>					<div className="content" style={{marginTop: "0px"}}>
																					<div className="radio" style={{padding: "10px"}}>
									<label>
										<input  onChange={this.onAddressChanged.bind(this)} type="radio" name="adress" value="3439" data-city="1" data-province="10" data-ward="167" checked=""/>
										Số 112 ngõ 165 phố chợ khâm thiên, Phường Trung Phụng, Quận Đống Đa, Hà Nội									</label>
								</div>
																			<div className="radio" style={{border: "1px solid #f2f2f2", backgroundColor: "#fffef1"
						,padding: "10px"}}>
						<label><input type="radio" name="site_name" 
                                   value="khac" 
                                   
                                   onChange={this.onSiteChanged.bind(this)} />Thêm địa chỉ khác</label>

					</div>
					<div style={{display:this.state.display}} className="newAddress">
						<div className="form-group">
							<label className="col-sm-4 control-label">Tỉnh/Thành phố</label>
							<div className="col-sm-6">
								<select name="data[UserOrderAddress][city]" id="selectCity" className="form-control"><option value="1">Hà Nội</option><option value="2">TP.Hồ Chí Minh</option><option value="3">An Giang</option><option value="4">Bà Rịa -  Vũng Tàu</option><option value="5">Bắc Giang</option><option value="6">Bắc Kạn</option><option value="7">Bạc Liêu</option><option value="8">Bắc Ninh</option><option value="9">Bến Tre</option><option value="10">Bình Dương</option><option value="11">Bình Định</option><option value="12">Bình Phước </option><option value="13">Bình Thuận</option><option value="14">Cà Mau</option><option value="15">Cần Thơ</option><option value="16">Cao Bằng</option><option value="17">Đà Nẵng</option><option value="18">Đăk Lăk </option><option value="19">Đăk Nông</option><option value="20">Điện Biên</option><option value="21">Đồng Nai</option><option value="22">Đồng Tháp</option><option value="23">Gia Lai</option><option value="24">Hà Giang</option><option value="25">Hà Nam</option><option value="26">Hà Tĩnh</option><option value="27">Hải Dương</option><option value="28">Hải Phòng</option><option value="29">Hậu Giang</option><option value="30">Hòa Bình</option><option value="31">Hưng Yên</option><option value="32">Khánh Hòa</option><option value="33">Kiên Giang</option><option value="34">Kon Tum</option><option value="35">Lai Châu</option><option value="36">Lâm Đồng</option><option value="37">Lạng Sơn</option><option value="38">Lào Cai</option><option value="39">Long An </option><option value="40">Nam Định</option><option value="41">Nghệ An</option><option value="42">Ninh Bình</option><option value="43">Ninh Thuận</option><option value="44">Phú Thọ</option><option value="45">Phú Yên</option><option value="46">Quảng Bình</option><option value="47">Quảng Nam </option><option value="48">Quảng Ngãi</option><option value="49">Quảng Ninh</option><option value="50">Quảng Trị</option><option value="51">Sóc Trăng</option><option value="52">Sơn La</option><option value="53">Tây Ninh</option><option value="54">Thái Bình</option><option value="55">Thái Nguyên</option><option value="56">Thanh Hóa</option><option value="57">Thừa Thiên Huế</option><option value="58">Tiền Giang</option><option value="59">Trà Vinh</option><option value="60">Tuyên Quang</option><option value="61">Vĩnh Long</option><option value="62">Vĩnh Phúc</option><option value="63">Yên Bái</option></select>
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">Quận/huyện</label>
							<div className="col-sm-6">
								<select name="data[UserOrderAddress][province]" id="selectProvince" className="form-control"><option value="1">Thị Xã Sơn Tây</option><option value="2">Quận Thanh Xuân</option><option value="3">Quận Tây Hồ</option><option value="4">Quận Nam Từ Liêm</option><option value="5">Quận Long Biên</option><option value="6">Quận Hoàng Mai</option><option value="7">Quận Hoàn Kiếm</option><option value="8">Quận Hai Bà Trưng</option><option value="9">Quận Hà Đông</option><option value="10">Quận Đống Đa</option><option value="11">Quận Cầu Giấy</option><option value="12">Quận Bắc Từ Liêm</option><option value="13">Quận Ba Đình</option><option value="14">Huyện Ứng Hòa</option><option value="15">Huyện Thường Tín</option><option value="16">Huyện Thanh Trì</option><option value="17">Huyện Thanh Oai</option><option value="18">Huyện Thạch Thất</option><option value="19">Huyện Sóc Sơn</option><option value="20">Huyện Quốc Oai</option><option value="21">Huyện Phúc Thọ</option><option value="22">Huyện Phú Xuyên</option><option value="23">Huyện Mỹ Đức</option><option value="24">Huyện Mê Linh</option><option value="25">Huyện Hoài Đức</option><option value="26">Huyện Gia Lâm</option><option value="27">Huyện Đông Anh</option><option value="28">Huyện Đan Phượng</option><option value="29">Huyện Chương Mỹ</option><option value="30">Huyện Ba Vì</option></select>
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">Phường, xã</label>
							<div className="col-sm-6">
								<select name="data[UserOrderAddress][ward]" id="selectWard" className="form-control"><option value="1">Phường Lê Lợi</option><option value="2">Phường Ngô Quyền</option><option value="3">Phường Phú Thịnh</option><option value="4">Phường Quang Trung</option><option value="5">Phường Sơn Lộc</option><option value="6">Phường Trung Hưng</option><option value="7">Phường Trung Sơn Trầm</option><option value="8">Phường Viên Sơn</option><option value="9">Phường Xuân Khanh</option><option value="10">Xã Cổ Đông</option><option value="11">Xã Đường Lâm</option><option value="12">Xã Kim Sơn</option><option value="13">Xã Sơn Bua</option><option value="14">Xã Sơn Dung</option><option value="15">Xã Sơn Đồng</option><option value="16">Xã Sơn Đông</option><option value="17">Xã Sơn Lập</option><option value="18">Xã Sơn Liên</option><option value="19">Xã Sơn Long</option><option value="20">Xã Sơn Màu</option><option value="21">Xã Sơn Mùa</option><option value="22">Xã Sơn Tân</option><option value="23">Xã Sơn Tinh</option><option value="24">Xã Thanh Mỹ</option><option value="25">Xã Xuân Sơn</option></select>
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">Số nhà, Xóm, Tổ, Đường ..v.v..</label>
							<div className="col-sm-6">
								<input type="text" className="form-control" id="inputPassword3" name="data[UserOrderAddress][address]" placeholder="Số nhà, Xóm, Tổ, Đường ..v.v.."/>
							</div>
						</div>
					</div>
					<div className="form-group hidden-xs">
						<div className="col-sm-6">
							<button type="button" onClick={this.nextStep.bind(this)} className="btn btn-default text-righ" ng-click="addAddress()">Tiếp tục</button>
						</div>
					</div>
					
									</div></form>
			</div>
            </div>
			</div>
			</div>
			</div>
        )
    }
}

 module.exports=connect(function(state){return{stepOrder:state.stepOrder}})(StepAddress);