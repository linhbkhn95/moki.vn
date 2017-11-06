/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	    'addCart':function(req,res){
            
            if(req.session.cart ==null){
                req.session.cart= [];
                req.session.cart.push(req.body.product);
              
            }
            else{
                console.log(req.session.cart);
                req.session.cart.push(req.body.product);
             
            }
            return res.send("ok");
         },
         'react':function(req,res){
            return res.view('homepage');
         },
         'removeCart':function(req,res){
            console.log("vao remove cart")
            var index=req.session.cart.map(function(x){ return x.productId; }).indexOf(req.body.productId);
            
            req.session.cart.splice(index,1);
            return res.send("ok");
         },
         'getCart':function(req,res){
             if(req.session.cart==null){
                 return res.send("not cart");
             }
             return res.send(req.session.cart);
         }
         
         

         

};

