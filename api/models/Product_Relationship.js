// /**
//  * Product_Relationship.js
//  *
//  * @description :: TODO: You might write a short summary of how this model works and what it represents here.
//  * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
//  */

// module.exports = {
    
//       autoCreatedAt: false,
//       autoUpdatedAt: false,
//       autoPK: false,
    
//       attributes: {
//         id: {
//           type: "integer",
//           columnName: "pr_id",
//           primaryKey: true,
//           autoIncrement: true,
//           require: true,
//           unique: true
//         },
//         from: {
//           type: "integer",
//           columnName: "pr_id_from",
//           require: true
//         },
//         to: {
//           type: "integer",
//           columnName: "pr_id_to",
//           require: true
//         },
//         from_type: {
//           type: "string",
//           columnName: "pr_id_from_type",
//         },
//         to_type: {
//           type: "string",
//           columnName: "pr_id_to_type",
//         },
//         comments_detail: {
//           collection: 'Comment',
//           through: 'ProductComment'
//         },
//         images: {
//           columnName: "pr_id_to",
//           collection: "Product_Image",
//           via: "id",
//           require: true
//         },
//         videos: {
//           columnName: "pr_id_to",
//           collection: "Product_Video",
//           via: "id",
//           require: true
//         },
//         additionals: {
//           columnName: "pr_id_to",
//           collection: "Product_Additional",
//           via: "id",
//           require: true
//         },
//         likes: {
//           columnName: "pr_id_to",
//           collection: "Product_Like",
//           via: "id",
//           require: true
//         },
//       }
//     };
    
    