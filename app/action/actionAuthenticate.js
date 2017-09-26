var AUTHENTICATE ="AUTHENTICATE";
var LOG_OUT_A ="LOG_OUT_A";
function authenticate(){
  return{type:AUTHENTICATE};
}
function logout_A(){
   return{type:LOG_OUT_A};
}
module.exports = {authenticate,logout_A};
