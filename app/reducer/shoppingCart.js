var data={
    cart:[
        

        
    ],
    count:0
}
var shoppingCart = (state = data, action) => {
    switch (action.type) {
      case 'ADD_CART':
   
       state.cart.push(action.product)
        return {...state,count:state.count+1,cart:state.cart};
      case 'ROMOVE_CART':
        return null;
      case "SET_CART":
        return {...state,count:action.cart.length,cart:action.cart}
      default:
        return state;
    }
  }
  module.exports = shoppingCart;
  