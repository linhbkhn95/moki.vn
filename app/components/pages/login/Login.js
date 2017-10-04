import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
class Login extends React.Component{
    login(){
        var {dispatch} = this.props;
        
       console.log(this.refs.sdt.value+' ' +this.refs.password.value);
       dispatch(login(this.refs.sdt.value));
       this.props.history.push('/');
   }
    render(){
        return(
            
                <div className="row " style={{    background:"#f1f1f1"}}>    
                 <div style={{marginTop:"50px"}} className="mainbox col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2">                    
                    <div className="panel panel-default" >
                            <div className="panel-heading">
                                <div className="panel-title">Đăng nhập để vào mua bán</div>
                                <div style={{float:"right", fontSize: "80%", position: "relative", top:"-10px"}}><a href="#">Quên mật khẩu</a></div>
                            </div>     

                            <div style={{paddingTop:"30px"}} className="panel-body" >

                                <div style={{display:"none"}} id="login-alert" className="alert alert-danger col-sm-12"></div>
                                    
                                <form id="loginform" className="form-horizontal" role="form">
                                            
                                    <div style={{marginBottom: "25px"}} className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                                <input ref="sdt"  type="text" className="form-control" defaultValue="0123456789" placeholder="Nhập số điện thoại của bạn.."/>                                        
                                            </div>
                                        
                                    <div style={{marginBottom: "25px"}} className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                                <input ref="password" type="password" className="form-control" placeholder="nhập mật khẩu của bạn.."/>
                                            </div>
                                            

                                        
                                    <div className="input-group">
                                            <div className="checkbox">
                                                <label>
                                                <input id="login-remember" type="checkbox" name="remember" value="1"/> Nhớ mật khẩu
                                                </label>
                                            </div>
                                            </div>


                                        <div style={{marginTop:"10px"}} className="form-group">
                                        

                                            <div className="col-sm-12 controls">
                                            <a id="btn-login" onClick={this.login.bind(this)} href="#" className="btn btn-default">Đăng nhập  </a>
                                            <a style={{marginLeft:"5px"}} id="btn-fblogin" href="#" className="btn btn-primary">Đăng nhập qua Facebook</a>

                                            </div>
                                        </div>


                                    
                                    </form>     



                                </div>                     
                            </div>  
            
                

                    
                    
                        
                </div> 
                
        </div>
        
        )
    }
}

module.exports = connect(function(state){return{}})(Login);