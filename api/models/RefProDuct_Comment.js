module.exports = {
  tableName: 'Product_Relationship',
  identity: 'ProductComment',
  migrate: 'safe',
  schema: true,
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id: {
      type: "integer",
      columnName: "pr_id",
      primaryKey: true,
      autoIncrement: true,
      require: true,
      unique: true
    },
    product: {
      model: 'Product',
      columnName: 'pr_id_from'
    },
    comments: {
      model: 'Comment',
      columnName: 'pr_id_to'
    },
    from_type: {
      type: "string",
      columnName: "pr_id_from_type",
      product: true
    },
    to_type: {
      type: "string",
      enum: ["COMMENT"],
      defaultsTo: "COMMENT",
      columnName: "pr_id_to_type"
    },
  },
  types: {
    product: function(value){
      console.log(value, value=="PRODUCT")
      return value=="PRODUCT"
    },
    comment: function(value) {
      console.log(value, value=="COMMENT")
      return value=="COMMENT"
    }  
  }
};