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
    id: {
      type: "integer",
      columnName: "pc_id",
      primaryKey: true,
      autoIncrement: true,
      require: true,
      unique: true
    },
    description: {
      type: "text",
      columnName: "pc_description",
      require: true
    },
    name: {
      type: "string",
      columnName: "pc_name",
      require: true
    },
    parent: {
      columnName: "pc_category_parent",
      model: 'Product_Category'
    },
    children: {
      collection: "Product_Category",
      via: "parent"
    }
  }
};

