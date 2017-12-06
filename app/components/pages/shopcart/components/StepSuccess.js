import React from 'react';

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
    render(){
        return(
			<div className="background-cart">
                <div className="checkout">
				<div className="container">
                <div className='col-md-8 col-md-offset-2'>   
                    <div className="checkout_info_price" style={{paddingTop: '10px'}}>
					<div className="headings">
						<h5>Xác nhận đơn hàng</h5>
					</div>
					
					</div>
			</div>
            </div>
			</div>
			</div>
			
        )
    }
}
module.exports = StepAddress;