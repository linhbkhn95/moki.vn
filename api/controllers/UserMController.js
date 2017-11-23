const pushnotify = require('../util/pushnotify');
const response = require('../util/response');

module.exports = {

    // Create a new user and tell the world about them.
    // This will be called every time a socket connects, so that each socket
    // represents one user--this is so that it's easy to demonstrate inter-user
    // communication by opening a bunch of tabs or windows.  In the real world,
    // you'd want multiple tabs to represent the same logged-in user.
    announce: function (req, res) {

        // Get the socket ID from the reauest
        if (!req.isSocket) {
            return res.json(response.NOT_ACCESS)
        }


        let self = this;
        var socketId = sails.sockets.getId(req);
        var user_agent = req.param('user-agent')
        //console.log(user_agent)
        // Get the session from the request
        var session = req.session;
        let user_id = req.session.user_id;

        StoredProcedure.query('call moki.connect(?, ?)', [user_id, user_agent], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            if (!data || data.length == 0) {
                res.status(401);
                res.json({
                    code: "1009",
                    message: "Not access."
                })
                return res;
            }

            UserM.findOne({ user_id: user_id }).exec(function (err, user) {
                if (!!user) {
                    if (!user.sockets.find(socket => { return socket == socketId })) {
                        user.sockets.push(socketId);
                        UserM.update({ user_id: user_id }, { sockets: user.sockets }).exec(function afterwards(err, user) {
                            res.json(user[0]);
                        });
                        req.user = {
                            id: user_id,
                            name: data[0].ui_name,
                            avartar: data[0].ui_avartar,
                        }
                        req.session[socketId] = req.user;
                        self.joinRoom(req, res);
                    } else {
                        res.json(user);
                    }
                } else {
                    UserM.create({
                        user_id: user_id,
                        name: data[0].ui_name,
                        avartar: data[0].ui_avartar,
                        sockets: [socketId]
                    }).exec(function (err, user) {
                        if (err) {
                            return res.serverError(err);
                        }
                        req.user = {
                            id: user_id,
                            name: data[0].ui_name,
                            avartar: data[0].ui_avartar,
                        }
                        req.session[socketId] = req.user;
                        self.joinRoom(req, res, true);
                        res.json(user);
                    });
                }
            })
        });

    },

    joinRoom: function (req, res, notify = true) {

        var socket = req.socket;
        let user_id = req.session.user_id;

        if (!req.isSocket) {
            return res.badRequest();
        }

        StoredProcedure.query('call get_list_rooms(?)', [user_id], (err, [data, server_status]) => {
            if (!!err) {
                console.log(err)
                return res.serverError(err);
            }

            data.forEach(room => {
                sails.sockets.join(req, room.r_id, function (err) {
                    console.log(room.r_id, "controller")
                    if (notify) {
                        sails.sockets.broadcast(room.r_id, {
                            type: 'join',
                            user: req.user,
                            room: {
                                id: room.r_id,
                                name: room.r_name,
                                create: room.r_fromdate,
                                product_id: room.r_product_id
                            }
                        })
                        console.log(sails.sockets.socketRooms(req.socket))
                    }
                });
            });
            console.log(sails.sockets.rooms())
        })
    },


    chatRoom: function (req, res) {
        
        console.log("new chat")
        let room_id = req.param('room_id');
        let message = req.param('message');
        let user_id = req.session.user_id;
        let socket = req.session[user_id];
        let socketId = sails.sockets.getId(socket);
        if (!message || typeof message !== 'string' || !(message.trim())
            || !room_id) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        StoredProcedure.query('select moki.isRoom(?, ?) as `check`', [user_id, room_id], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            let check = data.check;

            if (check == 0) {
                return res.json(response.PARAMETER_VALUE_IS_INVALID)
            }

            StoredProcedure.query('call moki.set_message(?, ?, ?)', [room_id, user_id, message], function (err, [data, server_status]) {
                if (err) {
                    return res.json(err)
                }

                let resuilt = response.OK;

                resuilt.data = {
                    id: data[0].md_id,
                    user_id: data[0].md_user_id,
                    message: data[0].md_message,
                    create: data[0].md_fromdate,
                    avatar: data[0].ui_avartar,
                    name: data[0].ui_name,
                }

                sails.sockets.broadcast(room_id, {
                    type: 'chat_message',
                    user: {
                        id: data[0].md_user_id,
                        username: data[0].ui_name,
                        avartar: data[0].ui_avartar,
                    },
                    room: {
                        id: data[0].r_id,
                        name: data[0].r_name,
                        create: data[0].r_fromdate,
                        product_id: data[0].r_product_id
                    },
                    message: {
                        id: data[0].md_id,
                        message: data[0].md_message,
                        create: data[0].md_fromdate,
                    }
                })

                //example

                if(parseInt(data[0].md_user_id) !== response.me) {
                    console.log(data[0].r_id.toString())
                    pushnotify.pushNotify("New Message", data[0].md_message, {"room_id": data[0].r_id.toString()})
                }
            })
        })
        return res.json(response.OK)
    },

    createRoom: function (req, res) {
        if (!req.isSocket) {
            return res.json(response.NOT_ACCESS)
        }
        let self = this;
        let socketId = sails.sockets.getId(req);
        let from_id = req.session[socketId].user_id;
        let to_id = req.param('to_id');
        let product_id = req.param('product_id');
        let room_name = req.param('room_name') || 'Seller to shopper';

        let user_create = req.session[socketId];

        if (!to_id || typeof to_id !== 'number' || to_id > 0
            || !product_id || typeof product_id !== 'number' || product_id > 0) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        StoredProcedure.query('call moki.set_room(?, ?, ?, ?)', [from_id, room_name, product_id], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            if (data.length == 0) {
                return res.json(response.PARAMETER_VALUE_IS_INVALID)
            }
            let newRoom = data[0];
            let room_id = data[0].r_id;
            StoredProcedure.query('call moki.add_user_to_room(?, ?)', [room_id, to_id], function (err, [data, server_status]) {
                if (err) {
                    return res.json(err)
                }

                UserM.findOne({ user_id: from_id }).exec(function (err, user) {
                    user.sockets.forEach((socket, index, arr) => {
                        sails.sockets.join(sails.sockets.get(socket), room_id, function (err) {
                            if (index == arr.length - 1) {
                                sails.sockets.broadcast(room.r_id, {
                                    type: 'add',
                                    user: {
                                        id: user.id_user,
                                        avartar: user.avartar,
                                        name: user.name
                                    },
                                    room: {
                                        id: newRoom.r_id,
                                        name: newRoom.r_name,
                                        create: newRoom.r_fromdate,
                                        Partner: {
                                            id: user_create.id_user,
                                            username: user_create.name,
                                            avatar: user_create.avartar,
                                        },
                                        Product: {
                                            id: newRoom.p_id,
                                            name: newRoom.p_name,
                                            image: newRoom.pi_url,
                                            price: newRoom.p_price,
                                        }
                                    }
                                })
                            }
                        })
                    })
                })

                UserM.findOne({ user_id: to_id }).exec(function (err, user) {
                    user.sockets.forEach((socket, index, arr) => {
                        sails.sockets.join(sails.sockets.get(socket), room_id, function (err) {
                            if (index == arr.length - 1) {
                                sails.sockets.broadcast(room.r_id, {
                                    type: 'add',
                                    user: {
                                        id: user.id_user,
                                        avartar: user.avartar,
                                        name: user.name
                                    },
                                    room: {
                                        id: newRoom.r_id,
                                        name: newRoom.r_name,
                                        create: newRoom.r_fromdate,
                                        Partner: {
                                            id: user_create.id_user,
                                            username: user_create.name,
                                            avatar: user_create.avartar,
                                        },
                                        Product: {
                                            id: newRoom.p_id,
                                            name: newRoom.p_name,
                                            image: newRoom.pi_url,
                                            price: newRoom.p_price,
                                        }
                                    }
                                })
                            }
                        })
                    })
                })

                let resuilt = response.OK;

                resuilt.data = {
                    id: newRoom.p_id,
                }

                return res.json(resuilt);
            })
        })
    },

    readMessage: function (req, res) {
        if (!req.isSocket) {
            return res.json(response.NOT_ACCESS)
        }

        let socketId = sails.sockets.getId(req);
        let room_id = req.param('room_id');
        let message_id = req.param('message_id');
        let user = req.session[socketId];

        if (!user
            || !room_id || typeof room_id !== 'number' || room_id > 0
            || !message_id || typeof message_id !== 'number' || message_id > 0) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        StoredProcedure.query('select moki.isRoom(?, ?) as `check`', [user_id, room_id], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            let check = data.check;

            if (check == 0) {
                return res.json(response.PARAMETER_VALUE_IS_INVALID)
            }


            StoredProcedure.query('call moki.read_message(?, ?)', [message_id, user_id], function (err, [data, server_status]) {
                if (err) {
                    return res.json(err)
                }

                let message = data[0];

                let resuilt = response.OK;

                if(message.md_read !== 'READ') {
                    resuilt = response.PARAMETER_VALUE_IS_INVALID;
                }

                return res.json(resuilt);
            })
        })
    },
};