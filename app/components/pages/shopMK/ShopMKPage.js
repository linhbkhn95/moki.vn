import React from 'react'
import ShopMK from './ShopMK.js';

module.exports = ({ match  }) => {
    console.log(match);
    
  
    return (
      <div>
         <ShopMK user_id={match.params.c} />
      </div>
  )
}