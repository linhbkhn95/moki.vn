var redux = require('redux');
var username = require('./username.js');
var auth = require('./auth.js');
var settings = require('./settings.js');
 var reducer = redux.combineReducers ({username,auth,settings});
 module.exports = reducer;
