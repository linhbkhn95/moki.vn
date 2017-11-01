 import axios from 'axios';
 var ADD_CART = "ADD_CART";
 var REMOVE_CART="REMOVE_CART";
 var SET_CART = "SET_CART";
function addCart(product){
      axios.post('/session/addCart',{product:product})
      .then(function(res){
          console.log(res.data);
       
      })
      .catch(function(e){
          console.log(e);
      })
   return{type:ADD_CART,product};
 }
  function  removeCart(productId){
    axios.post('/session/removeCart',{productId:productId})
    .then(function(res){
        console.log(res.data);
     
    })
    .catch(function(e){
        console.log(e);
    })
    return{type:REMOVE_CART,productId};
 }
 function setCart(cart){
     return{type:SET_CART,cart}
 }
 module.exports = {addCart,removeCart,setCart};
 