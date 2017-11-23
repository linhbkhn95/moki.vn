/**
 * CommentProductController
 *
 * @description :: Server-side logic for managing Commentproducts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add:function(req,res){
        
        CommentProduct.create(req.body).exec(function (err, commnet) {
            if (err) {
              return res.json(err.status, {err: err});
            }
            // If user created successfuly we return user and token as response
            if (commnet) {
              // NOTE: payload is { id: user.id}
               res.send(commnet);
            }
          });

    },
    getTop:function(req,res){
        CommentProduct.find(req.body).exec(function(err,listComment){
             if (err) {
                return res.json(err.status, {err: err});
             }
             if(listComment) {
                // NOTE: payload is { id: user.id}
                res.send(listComment);
             }
        })
    }
};

