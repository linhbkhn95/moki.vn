import React from 'react'
import DetailProductPage from './DetailProductPage.js';

module.exports = ({ match  }) => {
    console.log(match);
    
  
    return (
      <div className="col-md-9 right">
         <DetailProductPage product_Id={match.params.c} />
      </div>
  )
}