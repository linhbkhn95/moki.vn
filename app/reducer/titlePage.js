var username = (state = null, action) => {
  switch (action.type) {
    case 'SET_TITLE_PAGE':
      return action.title;
 
    default:
      return state;
  }
}
module.exports = username;
