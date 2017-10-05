/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res) {
        Product_Category.find({pc_category_parent:null})
            .populate("children")
            .exec(function(err, categories){
                //console.log(User_Information.query)
                if(err) {
                    return res.json(err)
                }
                return res.json(categories)
            })
    }
};

