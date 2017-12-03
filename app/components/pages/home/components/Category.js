import React from 'react'
import {NavLink,Link} from 'react-router-dom';
import CategoryPage from './CategoryPage.js';
import DetailProduct from 'app/utils/DetailProduct.js';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect} from 'react-router-dom';
module.exports = ({ match  }) => {
    console.log(match);
    return (
     
      <div className="col-md-9 right">

                  <CategoryPage category_id={match.params.d}/>
                  {/* <Route exact path={`/be`} component={CategoryPage} />   */}
               
                   {/* <Route path={`${match.url}/:d`} component={DetailProduct} />  */}
                   {/* <Route path={`${match.url}/:d`} component={DetailProduct} />  */}

                   {/* <CategoryPage /> */}
                   {/* <Route path={`${match.url}/product?:d`} component={DetailProduct} />  */}
                   {/* <CategoryPage /> */}
           

      </div>
   
  )
}