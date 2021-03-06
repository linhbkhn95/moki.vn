import React from 'react';
import {connect} from 'react-redux';
import {login} from 'app/action/actionUserName';
import {withRouter} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';




import {logout} from 'app/action/actionAuthenticate.js';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
             textError:""
             
        }
    }
    componentDidMount(){
        if(this.props.isAuthenticated)
        this.context.router.history.push('/');
    }
    login(e){
        var {dispatch} = this.props;

       e.preventDefault();

      var that =this;
       var {dispatch} = this.props;
       var {phone, password} = this.refs;
       console.log(phone.value);
   //  io.socket.get('/session/userlogin',{u:username.value}, function gotResponse(data, jwRes) {
   //     console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
   //   });
      axios.post('/api/login', {user_name: phone.value,password: password.value})
       .then(res => {
         
      console.log(res.data);
        if(res.data.code==1000){
         var data =res.data.data;
         localStorage.setItem('jwToken',data.token);
         setAuthorizationToken(data.token);
      //   dispatch(setCurrentUser(jwtDecode(res.data.token)));
          dispatch(setCurrentUser(jwtDecode(data.token).data))

       //  dispatch(showNotifi(""));
         //console.log(jwtDecode(data.token));
         console.log("dang nhap ok");
     //    console.log(that.refs.phone.getVal+' ' +that.refs.password.getValue());
         dispatch(login(that.refs.phone.value));
         this.context.router.history.push('/');
     //   if(res.data!=null){

     //     dispatch(login(res.data.user.email));
     //     dispatch(authenticate());
     //     axios.get('/session/getMenu')
     //     .then(res => {
     //       console.log(res.data);
     //         dispatch(loadMenu(res.data));
     //     })
     //     .catch(err => console.log(err));
     //   }
     //   else{

     //   //  dispatch(showNotifi(res.data));
     //   }
        }
        else{
            this.setState({textError:"Tên tài khoản hoặc mật khẩu không chính xác"})
        }
      })
     .catch(function(err){
      //  that.setState({textError:err.response.data.err});
        console.log(err);
     //  dispatch(showNotifi(err.response.data.err));
     });
    
      
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
                                                <input ref="phone"  type="text" className="form-control" defaultValue="0123456789" placeholder="Nhập số điện thoại của bạn.."/>                                        
                                            </div>
                                        
                                    <div style={{marginBottom: "25px"}} className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                                <input ref="password" type="password" className="form-control" placeholder="nhập mật khẩu của bạn.."/>
                                            </div>
                                            

                                    <div className="input-group">
                                            <div style={{color:"red",padding:"4px",marginTop:"-14px"}} className="">{this.state.textError}</div>
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
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

module.exports = connect(function(state){return{
    isAuthenticated:state.auth.isAuthenticated
}})(Login);