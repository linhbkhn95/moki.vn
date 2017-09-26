import axios from 'axios';
import setAuthorizationToken from 'app/utils/setAuthorizationToken';
// import jwtDecode from 'jwt-decode';
var SET_CURRENT_USER = "SET_CURRENT_USER";
export function setCurrentUser(user) {
   console.log(user);
  return {
    type: SET_CURRENT_USER,
    user
  };

}
export function logoutUser() {
  console.log('logoutUser');
  return dispatch => {
    localStorage.removeItem('jwToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}
// export function login(data) {
//   return dispatch => {
//     return axios.post('/auth/index', data).then(res => {
//       const token = res.data.token;
//       localStorage.setItem('jwtToken', token);
//       setAuthorizationToken(token);
//       dispatch(setCurrentUser(jwtDecode(token)));
//     });
//   }
// }
