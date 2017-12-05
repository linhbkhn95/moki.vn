var redux = require('redux');
var username = require('./username.js');
var stepOrder = require('./stepOrder.js');

var auth = require('./auth.js');
var shoppingCart = require('./shoppingCart.js');
var settings = require('./settings.js');
 var reducer = redux.combineReducers ({username,stepOrder,auth,settings,shoppingCart});
 module.exports = reducer;
