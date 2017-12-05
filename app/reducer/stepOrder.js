// import { SET_CURRENT_USER } from '../actions/types';


var data = {
  step: 3,
  current:2,
  data: {
    adress:{}
  }
};


 var auth = (state = data, action) => {
  //  console.log('dmmsádadadad');
  //   console.log(!isEmpty(action.user));
  switch(action.type) {

    case "SET_STEP_CURRENT":
      return {
            ...state,current:action.stepCurrent
      };
    default:
       return state;
  }
}
module.exports = auth;
