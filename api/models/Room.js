
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            columnName: "r_id",
            type: "integer",
            primaryKey: true,
            autoIncrement: true,
            require: true,
            unique: true
        },
        name: {
            columnName: "r_name",
            type: "text",
            require: true
        },
        fromdate: {
            columnName: "r_fromdate",
            type: "datetime"
        },
        thrudate: {
            columnName: "r_thrudate",
            type: "datetime"
        },
        status: {
            columnName: "r_statusid",
            type: "text",
        },
        user_create: {
            columnName: "r_user_id_create",

        },
        users: {
            collection: 'Room_Detail',
            via: 'room_id'
        },
    }
};

