import React from 'react'
import UserForm from './UserForm';

module.exports = ({ match  }) => {
    console.log(match);
    return (
    
    

         <UserForm username={match.params.username} />

    
  )
}