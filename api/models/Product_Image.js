/**
 * Product_Image.js
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
                columnName: "pi_id",
                primaryKey: true,
                autoIncrement: true,
                model: "Product_Relationship",
                require: true,
                unique: true
            },
            url: {
                columnName: "pi_url",
                type: "string",
                require: true
            },
            fromdate: {
                columnName: "pi_fromdate",
                type: "datetime",
                require: true
            },
            thrudate: {
                columnName: "pi_thrudate",
                type: "datetime"
            },
            status: {
                columnName: "pi_statusid",
                type: "string",
            }
        }
    };
    
    