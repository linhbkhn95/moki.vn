var data ={
      isAuthenticated:false,
      user:{}
    }
function initState(){
  io.socket.get('session/getInfo',function(data, jwRes){
     if(data==="CHUA_DANG_NHAP")
        return false;
     return true;
  });
}
 data = initState();
var authenticate = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return true;
    case 'LOG_OUT_A':
      return false;
    default:
      return state;
  }
}
module.exports = authenticate;
