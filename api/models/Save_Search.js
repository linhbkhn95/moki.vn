
module.exports = {
    
        autoCreatedAt: false,
        autoUpdatedAt: false,
        autoPK: false,
    
        attributes: {
            id: {
                type: "integer",
                columnName: "pa_id",
                primaryKey: true,
                autoIncrement: true,
                model: "Product_Relationship",
                require: true,
                unique: true
            },
            type: {
                columnName: "pa_type_id",
                model: "Information_Additional",
                type: "integer",
                require: true
            },
            value: {
                columnName: "pa_content",
                type: "string",
                require: true
            }
        }
    };
    
    