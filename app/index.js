var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {green100, green500, green700} from 'material-ui/styles/colors';



import injectTapEventPlugin from 'react-tap-event-plugin';
 var App = require('./components/App.js');
 var App = require('./components/App.js');
var SlideMenu =  require('./components/SlideMenuBar.js');

injectTapEventPlugin();
ReactDOM.render(
	 	     
     		 
     		 <App />
   	   
    ,
  document.getElementById('layout')
);
