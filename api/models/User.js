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
      columnName: "user_id",
      type: "integer",
      primaryKey: true,
      autoIncrement: true,
      require: true,
      unique: true
    },
    code: {
      columnName: "u_code",
      type: "string",
      require: true,
      unique: true
    },
    user_name: {
      columnName: "u_user_name",
      type: "string",
      require: true,
      unique: true
    },
    fromdate: {
      columnName: "u_fromdate",
      type: "datetime",
      require: true,
    },
    thrudate: {
      columnName: "u_thrudate",
      type: "datetime",
    },
    status: {
      columnName: "u_statusid",
      type: "string",
    },
    type: {
      columnName: "u_type",
      type: "string",
      require: true,
    },
    information: {
      collection: "User_Information",
      via: "user_id",
    }
  }
};

