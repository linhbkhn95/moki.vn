import axios from 'axios';
var ADD_CART = "ADD_CART";
var REMOVE_CART="REMOVE_CART";
var SET_CART = "SET_CART";
var SET_STEP ="SET_STEP";
function addCart(product){

 
  return{type:ADD_CART,product};
}
function setAddress(adress){

 return{type:"SET_ADDRESS",adress};
}
function stepSuccess(){
  

 return{type:"STEP_SUCCESS"};
}
function setStep(step){
   
 
  return{type:SET_STEP,step};
}
function setStepCurrent(stepCurrent){

   return{type:"SET_STEP_CURRENT",stepCurrent};
 }
 
module.exports = {setAddress,stepSuccess, setStepCurrent,setStep};
