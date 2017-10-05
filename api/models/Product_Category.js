/**
 * Categories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,
  
    attributes: {
      pc_id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true,
        require: true,
        unique: true
      },
      pc_description: {
        type: "text",
        require: true
      },
      pc_name: {
        type: "string",
        require: true
      },
      pc_category_parent: {
        model: 'Product_Category'
      },
      children: {
        collection: "Product_Category",
        via: "pc_category_parent"
      }
    }
  };
  
  