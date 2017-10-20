/**
 * Product_Like.js
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
                columnName: "pl_id",
                primaryKey: true,
                autoIncrement: true,
                model: "Product_Relationship",
                require: true,
                unique: true
            },
            create: {
                columnName: "pl_day_create",
                type: "datetime",
                require: true
            },
            user: {
                columnName: "pi_user_id",
                model: "User_Information",
                type: "integer",
                require: true
            }
        }
    };
