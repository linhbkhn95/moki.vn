// import { SET_CURRENT_USER } from '../actions/types';


var data = {
  step: 3,
  current:2,
  
    adress:{}

};


 var auth = (state = data, action) => {
  //  console.log('dmmsádadadad');
  //   console.log(!isEmpty(action.user));
  switch(action.type) {

    case "SET_STEP_CURRENT":
      return {
            ...state,current:action.stepCurrent
      };
    case "SET_ADDRESS":
      return {
            ...state,adress:action.adress,current:state.current+1,step:state.step+1,
      };
    case "STEP_SUCCESS":
      return {
            ...state,current:state.current+1,step:state.step+1,
      };
    default:
       return state;
  }
}
module.exports = auth;
