var lOGIN ="lOGIN";
var lOGOUT ="lOGOUT";
function login(username){
  return{type:"LOG_IN",data:{username:username,isAuthenticated:true}};
}
function logout(){
  console.log('logout action');
   return{type:"LOG_OUT"};
}
module.exports = {login,logout};
