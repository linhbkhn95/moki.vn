// var Menu = require('Menu');
// var Main = require('Main');
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
  // <div className="container">
                  
  //                       <div className="row">
  //                           <Nav />
  //                       </div>
  //                       <div className="">
  //                            <div style={{paddingRight:"0px"}} className="col-md-2">
  //                                <Menu />
  //                            </div>
  //                         <div style={{paddingLeft:"0px",paddingRight:"0px"}} className="col-md-10" >
  //                             {this.props.children}
  //                          </div>
  //                   </div>

  //              </div>