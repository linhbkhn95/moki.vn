
module.exports = {
        
        identity      : 'user_login',
        tableName     : 'user_login',
    
        autoCreatedAt: false,
        autoUpdatedAt: false,
        autoPK: false,
    
        attributes: {
            id: {
                columnName: "ul_id",
                type: "integer",
                primaryKey: true,
                autoIncrement: true,
            },
            ul_device_name: {
                columnName: "ul_device_name",
                type: "text",
                require: true
            },
            ul_fromdate: {
                columnName: "ul_fromdate",
                type: "datetime"
            },
            ul_thrudate: {
                columnName: "ul_thrudate",
                type: "datetime"
            },
            ul_status: {
                columnName: "ul_status",
                type: "text",
            },
            ul_user_id: {
                columnName: "ul_user_id",
                type: "integer",
            },
        }
    };
    
    