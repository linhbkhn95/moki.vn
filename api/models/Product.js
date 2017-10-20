/**
 * Product.js
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
      columnName: "p_id",
      primaryKey: true,
      autoIncrement: true,
      require: true,
      unique: true
    },
    code: {
      type: "string",
      columnName: "p_code",
      require: true,
      unique: true
    },
    name: {
      type: "string",
      columnName: "p_name",
      require: true
    },
    price: {
      type: "integer",
      columnName: "p_price",
    },
    price_percent: {
      type: "integer",
      columnName: "p_price_percent",
    },
    number: {
      type: "integer",
      columnName: "p_number",
      require: true
    },
    created: {
      type: "datetime",
      columnName: "p_fromdate",
      require: true
    },
    thrudate: {
      type: "datetime",
      columnName: "p_thrudate",
    },
    statusid: {
      type: "string",
      columnName: "p_statusid",
    },
    described: {
      type: "mediumtext",
      columnName: "p_description",
    },
    rating: {
      type: "float",
      columnName: "p_rating",
    },
    like: {
      type: "integer",
      columnName: "p_nlike",
    },
    comment: {
      type: "integer",
      columnName: "p_ncomment",
    },
    address_id: {
      type: "integer",
      columnName: "p_address_id",
      require: true
    },
    category_id: {
      type: "integer",
      columnName: "p_category_id",
      require: true
    },
    condition_id: {
      type: "integer",
      columnName: "p_condition_id",
      require: true
    },
    price_new: {
      type: "integer",
      columnName: "p_price_new",
    },
    price_type: {
      type: "integer",
      columnName: "p_price_type",
    },
    modified: {
      type: "datetime",
      columnName: "p_modified",
    },
    sell: {
      type: "integer",
      columnName: "p_user_id",
      model: "User_Information",
      require: true
    },
  }
};

