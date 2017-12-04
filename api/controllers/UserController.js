/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const response = require('../util/response');
const { key, survival_time } = require('../util/jwt');

module.exports = {
    get_user_infor: function (req, res) {

        let user_id = req.param('user_id')

        if (!user_id) {
            return res.json(response.PARAMETER_IS_NOT_ENOUGHT);
        }

        User_Information.find(
            { ui_userid: user_id }
        )
            .exec(function (err, user) {
                if (err) {
                    return res.json(err)
                }

                if (!user || user.length == 0) {
                    return res.json(response.PARAMETER_VALUE_IS_INVALID);
                }
                user = user[0]
                let me = false;
                if (!!req.param('token')) {
                    if (user_id == req.session.user_id) {
                        me = true;
                    }
                }

                let resuilt = response.OK;
                resuilt.data = {
                    id: user.ui_userid,
                    username: user.name,
                    url: `/user/${user.ui_userid}`,
                    status: user.statusid,
                    avatar: user.avartar,
                    address: me ? user.address : undefined,
                    city: me ? user.city : undefined,
                    followed: 0,
                    is_blocked: 0,
                    default_address: !me ? undefined : {
                        address_id: user.ui_userid,
                        address: user.address
                    }
                }

                res.json(resuilt);

                return res
            })
    },

    get: function (req, res) {
        User_Information.find()
            .exec(function (err, user) {
                if (err) {
                    return res.json(err)
                }
                return res.json(user)
            })
    },

    login: function (req, res) {
        let userName = req.param('user_name');
        let password = req.param('password');
        console.log(userName, password);
        let pwdMD5 = md5(password);
        console.log(pwdMD5)
        let user_agent = req.headers['user-agent'] || "anonymous";
        console.log(user_agent)
        StoredProcedure.query('call moki.login(?, ?, ?)', [userName, pwdMD5, user_agent], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            // user_login.update({ ul_user_id: 2173 }, { ul_status: 'ONLINE' }).exec(function afterwards(err, updated) {
            //     console.log("222")
            //     console.log(err, updated)
            //     console.log('Updated user to have name');
            // });

            if (!data || data.length == 0) {
                return res.json(response.NO_DATA_OR_END_OF_LIST_DATA)
            }
            let user = data[0]
            var payload = {
                user_id: user.u_id,
                user_code: user.u_code,
                type: user.u_type,
            }

            let token = jwt.sign({
                data: payload
            }, key, { expiresIn: survival_time });

            let result = response.OK

            result.data = {
                id: user.u_id,
                username: user.u_user_name,
                avartar: user.ui_avartar,
                token: token
            }

            return res.json(result)
        });
    },

    logout: function (req, res) {

        let user_id = req.session.user_id;
        let user_agent = req.headers['user-agent'] || "anonymous";
        StoredProcedure.query('call moki.logout(?, ?)', [user_id, user_agent], function (err, rawResult) {
            if (err) {
                return res.json(err)
            }

            user_login.update({ ul_user_id: 2173 }, { ul_status: 'LOGOUT' }).exec(function afterwards(err, updated) {
                console.log("222")
                console.log(err, updated)
                console.log('Updated user to have name');
            });

            let result = response.OK

            return res.json(result)
        });
    },

    search: function (req, res) {
        let name = req.param('name');
        User_Information.find({ name: name })
            .exec(function (err, user) {
                if (err) {
                    return res.json(err)
                }
                return res.json(user)
            })
    },

    get_list_room: function (req, res) {

        Room.find()
            .populate('users')
            .exec(function (err, rooms) {
                console.log(err, rooms)
                return res.json(rooms)
            })
    },

    get_list_conversation: function (req, res) {
        let self = this;
        let user_id = req.session.user_id;
        let index = req.param('index') || 0;
        let count = req.param('count') || 10;

        StoredProcedure.query('call moki.get_list_conversation(?, ?, ?)', [user_id, index, count], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            let result = response.OK
            let numNewMessage = 0;

            Promise.all(data.map((room) => {
                return new Promise(async (resolve, reject) => {
                    if (room.md_user_id !== user_id && room.md_read == 'UNREAD') {
                        numNewMessage++;
                    }

                    resolve({
                        id: room.r_id,
                        Partner: {
                            id: room.ui_userid,
                            username: room.ui_name,
                            avatar: room.ui_avartar,
                        },
                        Members: await self.get_members_room(room.r_id),
                        Product: {
                            id: room.p_id,
                            name: room.p_name,
                            image: room.pi_url,
                            price: room.p_price,
                        },
                        LastMessage: {
                            message: room.md_message,
                            created: room.md_fromdate,
                            unread: room.md_user_id == user_id ? 0 : (room.md_read == 'READ' ? 0 : 1),
                        }
                    })
            })
            })).then((conversation) => {
            result.data = conversation;
            result.numNewMessage = numNewMessage;
            return res.json(result)
        })
    });
},

    get_conversation: function (req, res) {
        let user_id = req.session.user_id;
        let conversation_id = parseInt(req.param('conversation_id'));
        let index = req.param('index') || 0;
        let count = req.param('count') || 10;

        if (!conversation_id) {
            return res.json(response.PARAMETER_VALUE_IS_INVALID)
        }

        if (typeof conversation_id !== 'number') {
            return res.json(response.PARAMETER_TYPE_IS_INVALID)
        }



        StoredProcedure.query('select moki.isRoom(?, ?) as `check`', [user_id, conversation_id], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            let check = data.check;

            if (check == 0) {
                return res.json(response.PARAMETER_VALUE_IS_INVALID)
            }

            StoredProcedure.query('call moki.get_conversation(?, ?, ?)', [conversation_id, index, count], function (err, [data, server_status]) {
                if (err) {
                    return res.json(err)
                }

                let result = response.OK
                let numNewMessage = 0;
                result.data = data.map((message) => {
                    return {
                        message: message.md_message,
                        unread: message.md_read == 'READ' ? 0 : 1,
                        created: message.md_fromdate,
                        sender: {
                            id: message.ui_userid,
                            username: message.ui_name,
                            avartar: message.ui_avartar
                        }
                    }
                })

                return res.json(result)
            });

        });



    },

get_members_room: function (room_id) {

    return new Promise((resolve, reject) => {
        StoredProcedure.query('call moki.get_members_room(?)', [room_id], function (err, [data, server_status]) {
            if (err) {
                console.log(err)
                reject(err)
                return;
            }
            //console.log(data)
            resolve(
                data.map((member) => {
                    return {
                        id: member.ui_userid,
                        username: member.ui_name,
                        avatar: member.ui_avartar,
                    }
                })
            )
        })

        
    })
},

};

