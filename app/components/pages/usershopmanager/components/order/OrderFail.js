import React from 'react';
import {connect} from 'react-redux';
;
class OrderFail extends React.Component{
  
   
    render(){
        return(
              <section>
                <div className="manager-user-shopcart">
                    order  fail
                </div>
            </section>
            
        )
    }
}

module.exports = connect(function(state){return{shoppingCart:state.shoppingCart}})(OrderFail);
