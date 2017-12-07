/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  /**
   * policy public
   */
  UserController: {
    login: 'public',
    logout: 'buyer',
    connect: 'buyer',
    get_user_infor: 'public',
    get_list_conversation: 'buyer',
    get_conversation: 'buyer',
    checkLogin: 'buyer',
    get_shop_infor: 'public'
  },

  UserMController: {
    announce: 'buyer',
    chatRoom: 'buyer'
  },

  ProductController: {
    user_listings: 'public',
    get_list_conditions: 'public',
    get_list_sizes: 'public',
    get_list_brands: 'public',
    getNewProducts: 'public',
    getProducts: 'public',
    get_products: 'public',
    getComments: 'public',
    setComments: 'buyer',
    like: 'buyer',
    listMyLike: 'buyer',
    setRates: 'buyer',
    set_save_search: 'buyer',
    get_list_save_search: 'buyer',
    addProduct: 'buyer',
    setOrder: 'buyer',
    viewOrder: 'buyer',
    viewOrderByShop: 'salesman',
    setOrderStatus: 'admin',
    setStatusProductOrder: 'salesman',
    viewListOrder: 'admin',
    statistics_shop_revenue: 'salesman',
    statistics_product_inventory: 'salesman'
  },

  CategoryController: {
    get: 'public'
  },

  '/api/searchAnyWhere': 'public',
  '/api/get_list_news': 'public',
  '/api/get_news': 'public',
  '/api/get_user_info': 'public',
  '/api/get_rates': 'public',
  '/api/get_list_sizes': 'public',
  '/api/get_ship_from': 'public',

  /**
   * policy salesman
   */
  '/api/add_products': 'salesman',
  '/api/edit_products': 'salesman',
  '/api/get_my_likes': 'salesman',
  
  /**
   * policy buyer
   */
  '/api/set_rates': 'buyer',
  '/api/set_user_info': 'buyer',
  '/api/get_list_saved_search': 'buyer',
  '/api/save_search': 'buyer',
  '/api/buy_products': 'buyer',
  '/api/report_products': 'buyer',
  '/api/like_products': 'buyer',


  /**
  * policy manager
  */


  /**
   * policy admin
   */
  '/api/get_list_blocks': 'admin',
  '/api/blocks': 'admin',


  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
  // RabbitController: {

  // Apply the `false` policy as the default for all of RabbitController's actions
  // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
  // '*': false,

  // For the action `nurture`, apply the 'isRabbitMother' policy
  // (this overrides `false` above)
  // nurture	: 'isRabbitMother',

  // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
  // before letting any users feed our rabbits
  // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
};
