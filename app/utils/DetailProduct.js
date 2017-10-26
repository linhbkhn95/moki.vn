import React from 'react'
import DetailProductPage from './DetailProductPage.js';

module.exports = ({ match  }) => {
    console.log(match);
    
  
    return (
       
         <DetailProductPage productId={match.params.d} />
      
  )
}