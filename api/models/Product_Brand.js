
module.exports = {
    
        autoCreatedAt: false,
        autoUpdatedAt: false,
        autoPK: false,
    
        attributes: {
            id: {
                type: "integer",
                columnName: "pb_id",
                primaryKey: true,
                autoIncrement: true,
                require: true,
                unique: true
            },
            name: {
                type: "string",
                columnName: "pb_name",
                require: true
            },
            description: {
                type: "mediumtext",
                columnName: "pb_description",
                require: true
            },
            logo: {
                type: "string",
                columnName: "pb_logo",
                require: true
            },
            address_headquarters: {
                type: "string",
                columnName: "pb_address_headquarters",
                require: true
            },
        }
    };
    
    