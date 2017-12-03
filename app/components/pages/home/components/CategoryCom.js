import React from 'react';
import {NavLink} from 'react-router-dom';
import Category from './Category.js';

class Home extends React.Component{
 
  render(){
    var that =this;
    return(
       
          <div>
        
          
               
                    <Route exact   path="/home/category-:d" component={Category} />
                    
                    {/* <Route exact path="/product/:item" component={DetailProduct}/> */}
                    <Route render={function(){
                          return <p> Danh mục khôngdd tồn tại</p>
                           }
                       } /> 
                   {/* <Route path="/detail/:d" component={DetailProduct} /> */}
              {/* </Switch> */}
           
              
            
            </div>
      
      
    )
  }
}
module.exports =  Home;
