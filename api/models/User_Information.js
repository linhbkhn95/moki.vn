/**
 * User.js
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
      columnName: "ui_id",
      primaryKey: true,
      autoIncrement: true,
      require: true,
      unique: true
    },
    ui_userid: {
      type: "integer",
      require: true,
      model: 'User',
      unique: true
    },
    name: {
      type: "string",
      columnName: "ui_name",
      require: true
    },
    email: {
      type: "string",
      columnName: "ui_email",
      require: true
    },
    phone: {
      type: "string",
      columnName: "ui_phone",
    },
    address: {
      type: "string",
      columnName: "ui_address",
    },
    city: {
      type: "string",
      columnName: "ui_city",
      require: true
    },
    birthday: {
      type: "date",
      columnName: "ui_birthday",
      require: true
    },
    gender: {
      type: "string",
      columnName: "ui_gender",
      require: true
    },
    fromdate: {
      type: "datetime",
      columnName: "ui_fromdate",
      require: true
    },
    thrudate: {
      type: "datetime",
      columnName: "ui_thrudate",
    },
    statusid: {
      type: "string",
      columnName: "ui_statusid",
      require: true
    },
    avartar: {
      type: "string",
      columnName: "ui_avartar",
    }
  }
};

