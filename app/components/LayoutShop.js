
var Nav = require('./Nav.js');
var Menu = require('./Menu.js');
var React = require('react');
var {connect} = require('react-redux');
class Layout extends React.Component{
       render(){
        
         return(
               <div className="">
                  
                        <div className="row">
                      		  <Nav />
                        </div>
                        <div className="clearfix"></div>
                        <div className="wrapper">
		                     {this.props.children}
		                       </div>
		               
               </div>

         )
     }
}
module.exports =Layout;
