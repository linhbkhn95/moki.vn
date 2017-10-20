/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    identity      : 'Comment',
    tableName     : 'product_comment',
    migrate       : 'safe',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            type: "integer",
            columnName: "cmt_id",
            primaryKey: true,
            autoIncrement: true,
            require: true,
            unique: true
        },
        cmt_content: {
            type: "mediumtext",
            require: true
        },
        cmt_fromdate: {
            type: "datetime",
            require: true
        },
        cmt_thrudate: {
            type: "datetime"
        },
        cmt_statusid: {
            type: "string",
        },
        product: {
            collection: 'product',
            through: 'productcomment'
        }
    }
};

