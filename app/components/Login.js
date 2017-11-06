import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import {login} from 'app/action/actionUserName';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';


import {login,logout} from 'app/action/actionAuthenticate.js';
import setAuthorizationToken from 'app/utils/setAuthorizationToken.js';
import {setCurrentUser} from 'app/action/authActions.js';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
const style = {
  
  
 margin:5
};
class Login extends React.Component{ 
 
     constructor(props) {
        super(props);

        this.state = {
           errorTextUserName: '',
           errorTextPassword:''
        };
      }
   onChange(event) {
    if (event.target.value=="") {
      this.setState({ errorTextUserName: 'This field is required'})
    } else {
      this.setState({ errorTextUserName: '' })
    }
  }
   onChangePass(event) {
    if (event.target.value=="") {
      this.setState({ errorTextPassword: 'This field is required'})
    } else {
      this.setState({ errorTextPassword: '' })
    }
  }
    login(e){
         var {dispatch} = this.props;

        e.preventDefault();

       var that =this;
        var {dispatch} = this.props;
        var {username, password} = this.refs;

    //  io.socket.get('/session/userlogin',{u:username.value}, function gotResponse(data, jwRes) {
    //     console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
    //   });
       axios.post('auth/index', {phone: username.getValue(),password: password.getValue()})
        .then(res => {
          console.log(res.data);
          localStorage.setItem('jwToken',res.data.token);
          setAuthorizationToken(res.data.token);
          dispatch(setCurrentUser(jwtDecode(res.data.token)));
        //  dispatch(showNotifi(""));
          console.log(jwtDecode(res.data.token));
          console.log("dang nhap ok");
          console.log(that.refs.username.getValue()+' ' +that.refs.password.getValue());
          dispatch(login(that.refs.username.getValue()));
          that.props.history.push('/');
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
       })
      .catch(function(err){
         console.log('loi cmmdadm');
      //  dispatch(showNotifi(err.response.data.err));
      });
       
    }
    // _handleTextFieldChange: function(e) {
    //     this.setState({
    //         textFieldValue: e.target.value
    //     });
    // }
   render(){

       return(
         
         <div style={{paddingTop:"34px"}} className=" col-md-4 col-sm-8 col-sm-push-2 col-md-push-4 col-xs-12">
             <LinearProgress mode="indeterminate" />
            <Paper zDepth={5}>
                <div>
                  <div className="head">Form Login</div>   
                </div>
                <div className="" style={{padding:"15px", textAlign:"center"}}>
                   <TextField
                          errorText={this.state.errorTextUserName}
                          required={true} 
                          hintText="UserName"
                          ref="username"
                          onChange={this.onChange.bind(this)}
                          floatingLabelText="username"
                    /><br />
                
                   <TextField
                      errorText={this.state.errorTextPassword}
                      onChange={this.onChangePass.bind(this)}
                      required={true} 
                      hintText="Password Field"
                      floatingLabelText="Password"
                      ref="password"
                      type="password"
                    /><br />
                    
                    <div style={{padding:"20px"}}>
                       <Divider />
                        <div style={{padding:"20px"}}>
                        <RaisedButton disabled={!(this.state.errorTextPassword===""&&this.state.errorTextUserName==="")} onClick={this.login.bind(this)} label="Login" primary={true} style={style} />
                        <RaisedButton label="Regester" secondary={true} style={style} />
                        </div>
                      </div>
                 </div>
              </Paper>

        </div>
    );
  }
}



 module.exports = connect(function(state){return{}})(Login);