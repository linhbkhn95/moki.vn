// import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from 'lodash.isEmpty';

var data = {
  isAuthenticated: false,
  user: {}
};


 var auth = (state = data, action) => {
   console.log('dmmsádadadad');
    console.log(!isEmpty(action.user));
  switch(action.type) {

    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
       return state;
  }
}
module.exports = auth;
