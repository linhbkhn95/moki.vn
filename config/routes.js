/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
   '/eventLog':{
    view:'homepage'
   },
   '/user/login':{
    view:'homepage'
   },
   '/linh':{
    view:'homepage'
   },
   '/dashboard':{
    view:'homepage'
   },
   '/settings':{
     view:'homepage'
   },
   '/be/thia':{
     view:'homepage'
   },
   '/shopCart':{
    view:'homepage'
  },
  '/shopMK':{
    view:'homepage'
  },
  // '/product/:d'   : {
  //   view:'homepage'
  // }
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/






  'post /roomm/:roomId/users': 'RoomMController.join',
  'delete /roomm/:roomId/users': 'RoomMController.leave',
  '/userm/announce': 'UserMController.announce',

  //test socket
  //'/user/connect': 'UserController.connect',

  /**
   * Route view user
   */

  '/api/user': 'UserController.get',

  /**
   * Route view product
   */
  '/api/get_categories': 'CategoryController.get',
  '/api/get_list_products': 'ProductController.getProducts',
  '/api/get_products': 'ProductController.getProduct',
  '/api/get_comment_products': 'ProductController.getComments',
  
  
  '/api/chatRoom': 'UserMController.chatRoom',
  /**
   * Route search product
   */
  '/api/search': 'ProductController.search',


  /**
   * public
   */
  '/api/get_user_info': 'UserController.get_user_infor',
  '/api/get_list_sizes': 'ProductController.get_list_sizes',
  '/api/get_list_brands': 'ProductController.get_list_brands',
  '/api/get_list_conditions': 'ProductController.get_list_conditions',
  '/api/get_user_listings': 'ProductController.user_listings',
  

  //'/api/test': 'ProductController.upload',
  /**
   * Route login
   */
  '/api/login': 'UserController.login',


  /**
   * buyer
   */

  '/api/set_comment_products': 'ProductController.setComments',
  '/api/like_products': 'ProductController.like',
  '/api/get_my_likes': 'ProductController.listMyLike',
  '/api/set_rates': 'ProductController.setRates',
  '/api/save_search': 'ProductController.set_save_search',
  '/api/get_list_saved_search': 'ProductController.get_list_save_search',
  '/api/logout': 'UserController.logout',
  '/api/add_products': 'ProductController.addProduct',
  '/api/get_list_conversation': 'UserController.get_list_conversation',
  '/api/get_conversation': 'UserController.get_conversation',
  
};
