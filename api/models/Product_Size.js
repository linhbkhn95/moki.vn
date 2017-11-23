
module.exports = {
    
        autoCreatedAt: false,
        autoUpdatedAt: false,
        autoPK: false,
    
        attributes: {
            id: {
                type: "integer",
                columnName: "pz_id",
                primaryKey: true,
                autoIncrement: true,
                require: true,
                unique: true
            },
            name: {
                type: "string",
                columnName: "pz_name",
                require: true
            },
            description: {
                type: "mediumtext",
                columnName: "pz_description",
                require: true
            }
        }
    };
    
    