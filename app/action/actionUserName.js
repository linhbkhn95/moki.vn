 function login(username){
   console.log(username);
  return{type:'LOG_IN',username};
}
 function  logout(){
   return{type:'LOG_OUT'};
}
module.exports = {login,logout};
