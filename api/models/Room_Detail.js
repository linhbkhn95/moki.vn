
module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            columnName: "rd_id",
            type: "integer",
            primaryKey: true,
            autoIncrement: true,
        },
        room_id: {
            columnName: "rd_room_id",
            type: "integer",
            require: true,
            model: 'Room'
        },
        user_id: {
            columnName: "rd_user_id",
            type: "integer",
            require: true
        },
        fromdate: {
            columnName: "rd_fromdate",
            type: "datetime"
        },
        thrudate: {
            columnName: "rd_thrudate",
            type: "datetime"
        },
    }
};

