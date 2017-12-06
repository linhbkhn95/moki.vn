import { parse } from "querystring";

var data={
    cart:[
        

        
    ],
    count:0
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var delete_cookie = function(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
      alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
         setCookie("username", user, 30);
     }
  }
}

var shoppingCart = (state = data, action) => {
    switch (action.type) {
      case 'ADD_CART':

        var product = state.cart.find(function(p) {
          return p.product_id == action.product.product_id;
        })
        console.log(product)
        if(!!product) {
          product.quantity += action.product.quantity;
        }
        else{
          state.cart.push(action.product);
        
        }

         //kiem tra xem da co trong gio hang chua
        // var index=state.cart.map(function(x){ return x.product_id; }).indexOf(action.product_id);
        //  if(index = -1){
        //  }
        //  else{
        //    console.log('+product');
        //    state.cart[index].quantity += action.quantity;
        //  }
         setCookie("cart",JSON.stringify(state.cart),30);
         setCookie("cart_count",state.count+action.product.quantity,30);
         
        return {...state,count:state.count+action.product.quantity,cart:state.cart};
      case 'REMOVE_CART':
        var index=state.cart.map(function(x){ return x.product_id; }).indexOf(action.product_id);
        
        var  product = state.cart.splice(index,1);
        console.log('xpaa');
        console.log(product);
        setCookie("cart",JSON.stringify(state.cart),30);

        setCookie("cart_count",state.count-product[0].quantity,30);
        return {...state,count:state.count-product[0].quantity,cart:state.cart};

      case 'SET_QUANTITY':
          let quantity_old=1;
          let countnew=0;
          var product = state.cart.find(function(p) {
            return p.product_id == action.product.product_id;
          })
          quantity_old = product.quantity;
          product.quantity = action.product.quantity;
          if(quantity_old>action.quantity)
              countnew = state.count +quantity_old-action.product.quantity;
              
          else
              countnew = state.count+action.product.quantity-quantity_old;
          console.log(countnew);
         setCookie("cart",JSON.stringify(state.cart),30);
         setCookie("cart_count",countnew,30);
         
        return {...state,count:countnew,cart:state.cart};
      case "SET_CART":
        let cart=[];
        let count=0;
        console.log('getcokki')
        let data = getCookie("cart");
        let count_data= getCookie("cart_count")
        console.log(data);
        if(data !=""){
           cart = JSON.parse(getCookie("cart"));
           count= parseInt(count_data);
        }
        return {...state,count:count,cart:cart}
       case "RESET_CART":
          delete_cookie("cart");
          delete_cookie("cart_count");
        
        return data;
      default:
        return state;
    }
  }
  module.exports = shoppingCart;
  