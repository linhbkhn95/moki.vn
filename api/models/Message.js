
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            columnName: "md_id",
            type: "integer",
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            columnName: "md_user_id",
            type: "integer",
            require: true
        },
        message: {
            columnName: "md_message",
            type: "mediumtext",
            require: true
        },
        room_id: {
            columnName: "md_room_id",
            type: "text",
            require: true,
            model:'room',
        },
        fromdate: {
            columnName: "md_fromdate",
            type: "datetime"
        },
        thrudate: {
            columnName: "md_thrudate",
            type: "datetime"
        },
        status: {
            columnName: "md_status",
            type: "text",
        }
    }
};

