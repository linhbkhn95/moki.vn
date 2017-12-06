/**
 * SatisticsController
 *
 * @description :: Server-side logic for managing satistics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 //statistics_product_like : get 10 san pham dc yeu thich
 //statistics_product_buy : get 10 san pham ban chay nhat
 // statistics_user_buy : get 10 user mua nhieu nhat


//  1
//  CREATE DEFINER=`root`@`localhost` PROCEDURE `statistics_user_buy`()
//  BEGIN
//      select user.u_id,user.u_user_name ,user_information.ui_name, count(ord_number)
//      from order_detail,`moki`.`order`,user,user_information
//      where user.u_id=user_information.ui_id and`moki`.`order`.o_id= order_detail.ord_order_id and ord_status ="APPROVED" and user.u_id=`moki`.`order`.o_user_id
//      group by user.u_id,user.u_user_name,user_information.ui_name,ord_number limit 10;
     
//  END
//  2
//  CREATE DEFINER=`root`@`localhost` PROCEDURE `statistics_product_like`()
//  BEGIN 
//      select   p_name, p_nlike  
//      from product
//      order by p_nlike DESC LIMIT 10  ;
    
//  END
//  CREATE DEFINER=`root`@`localhost` PROCEDURE `statistics_product_buy`()
//  BEGIN
//      select product.p_name ,count(ord_number)
//      from product,order_detail
//      where product.p_id = order_detail.ord_p_id and ord_status ="APPROVED"
//      group by ord_p_id,product.p_name,ord_number limit 10;
     
//  END
//  3


module.exports = {
    like_product: function (req, res) {
        // let user_id = req.session.user_id;
        // let product_id = req.param('product_id');

        // if (!user_id && !product_id && typeof product_id != 'number') {
        //     let result = response.PARAMETER_TYPE_IS_INVALID;
        //     res.status(402);
        //     res.json(result)

        //     return res;
        // }

        StoredProcedure.query('call statistics(?, ?)', [product_id, user_id], function (err, [data, server_status]) {
            let result = response.OK;

            if (err) {
                //console.log("err", err)
                result = response.CODE_VERIFY_IS_INCORRECT;
                res.status(500);
                return res.json(result)
            }

            result.data = {
                like: data[0].like
            }


            res.status(200);
            res.json(result);
            return res;

        });
    },
};

