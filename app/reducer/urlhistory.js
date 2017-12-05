// import { SET_CURRENT_USER } from '../actions/types';


var data = {
    step: 1,
    stepCurrent:2,
    data: {
  
    }
  };
  
  
   var auth = (state = null, action) => {
    //  console.log('dmmsádadadad');
    //   console.log(!isEmpty(action.user));
    switch(action.type) {
  
      case "SET_URL_BEFOR_lOGIN":
        return 
            action.url
        
      default:
         return state;
    }
  }
  module.exports = auth;
  