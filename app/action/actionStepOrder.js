import axios from 'axios';
var ADD_CART = "ADD_CART";
var REMOVE_CART="REMOVE_CART";
var SET_CART = "SET_CART";
var SET_STEP ="SET_STEP";
function addCart(product){
   //   axios.post('/session/addCart',{product:product})
   //   .then(function(res){
   //       console.log(res.data);
      
   //   })
   //   .catch(function(e){
   //       console.log(e);
   //   })
 
  return{type:ADD_CART,product};
}
function setStep(step){
   //   axios.post('/session/addCart',{product:product})
   //   .then(function(res){
   //       console.log(res.data);
      
   //   })
   //   .catch(function(e){
   //       console.log(e);
   //   })
 
  return{type:SET_STEP,step};
}
function setStepCurrent(stepCurrent){
    //   axios.post('/session/addCart',{product:product})
    //   .then(function(res){
    //       console.log(res.data);
       
    //   })
    //   .catch(function(e){
    //       console.log(e);
    //   })
  
   return{type:"SET_STEP_CURRENT",stepCurrent};
 }
 function  removeCart(product_id){
   // axios.post('/session/removeCart',{productId:productId})
   // .then(function(res){
   //     console.log(res.data);
    
   // })
   // .catch(function(e){
   //     console.log(e);
   // })
   return{type:REMOVE_CART,product_id};
}
function setCart(){
    return{type:SET_CART}
}
module.exports = {addCart,removeCart,setStepCurrent,setStep,setCart};
