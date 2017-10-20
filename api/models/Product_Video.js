/**
 * Product_Video.js
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
            columnName: "pv_id",
            primaryKey: true,
            model: "Product_Relationship",
            autoIncrement: true,
            require: true,
            unique: true
        },
        url: {
            type: "string",
            columnName: "pv_url",
            require: true
        },
        fromdate: {
            type: "datetime",
            columnName: "pv_fromdate",
            require: true
        },
        thrudate: {
            type: "datetime",
            columnName: "pv_thrudate",
        },
        statusid: {
            type: "string",
            columnName: "pv_statusid",
        },
        url_thumb: {
            type: "string",
            columnName: "pv_thumb",
        }
    }
};

