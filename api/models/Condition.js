/**
 * Condition.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: {
    cond_id: {
      type: "integer",
      primaryKey: true,
      autoIncrement: true,
    },
    cond_name: {
      type: "text",
      require: true
    },
    cond_description: {
      type: "mediumtext",
      require: true
    },
    cond_fromdate: {
      type: "datetime",
      require: true
    },
    cond_thrudate: {
      type: "datetime",
    }
  }
};

