/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 'getDetail':function(req,res){
       
         Product.findOne({productId:req.body.productId}).exec(function(err,product){
              if(err){
                  console.log("fail");
                 return  res.send("fail");
              }
                 return res.send(product);
         });

     }
};

