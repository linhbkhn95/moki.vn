import React from 'react';
import {connect} from 'react-redux';
;
class OrderSuccess extends React.Component{
  
   
    render(){
        return(
              <section>
                <div className="manager-user-shopcart">
                    order  success
                </div>
            </section>
            
        )
    }
}

module.exports = connect(function(state){return{shoppingCart:state.shoppingCart}})(OrderSuccess);
