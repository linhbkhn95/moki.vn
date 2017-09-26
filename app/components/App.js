var React = require('react');

import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';


var {Provider} = require('react-redux');

var store = require('app/store.js');

var Layout = require('app/components/Layout.js');
var Home = require('app/components/Home.js');

 class App extends React.Component{

// require('style-loader!css-loader!foundation-sites/dist/css/foundation.min.css');
//require('style!css!sass!./css/style.scss');
// $(document).ready(() => $(document).foundation());
 
     render(){
        return(
        
             <Provider store={store}>
              <Router history={hashHistory}>
                  
                  <Layout>
                   <Switch>
                    
                      <Route  exact   path="/" component={Home}/>
                     
                   
                      <Route render={function(){
                          return <p> not found</p>
                      }
                    } />
                 </Switch>
               </Layout>
             </Router>
             </Provider>
        
     
    )
  }
}

module.exports = App;

