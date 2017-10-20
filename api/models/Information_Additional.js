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
                columnName: "infa_id",
                primaryKey: true,
                autoIncrement: true,
                collection: "Product_Additional",
                via: "type",
                require: true,
                unique: true
            },
            description: {
                columnName: "infa_description",
                type: "mediumtext",
                require: true
            },
            name: {
                columnName: "infa_name",
                type: "string",
                require: true
            }
        }
    };
    
    