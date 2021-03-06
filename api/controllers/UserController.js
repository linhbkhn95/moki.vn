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
            if(!req.headers['authorization']) {
                return res.json(response.PARAMETER_IS_NOT_ENOUGHT);
            }
            user_id = req.session.user_id;
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
                let token = req.headers['authorization'];
                if (!!token) {
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
                    email: user.email,
                    birthday: user.birthday,
                    gender: user.gender,
                    phone: user.phone,
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

    get_shop_infor: function (req, res) {

        let user_id = req.param('user_id')

        if (!user_id) {
            return res.json(response.PARAMETER_IS_NOT_ENOUGHT);
        }
        let token = req.headers['authorization'];
        let me = false;
        if (!!token) {
            if (user_id == req.session.user_id) {
                me = true;
            }
        }

        StoredProcedure.query('call moki.get_shop_info(?)', [user_id], function (err, [user, server_status]) {
            if (err) {
                return res.json(err)
            }
            if(user.length < 1) {
                res.json(response.PARAMETER_VALUE_IS_INVALID);
            } else {
                user = user[0]
            }
            StoredProcedure.query('call moki.get_top_comment(?)', [user_id], function (err, [comments, server_status]) {
                let resuilt = response.OK;
                resuilt.data = {
                    id: user.ui_userid,
                    username: user.ui_name,
                    address: !me ? undefined : user.ui_address,
                    avartar: user.ui_avartar,
                    email: user.ui_email,
                    create: user.ui_fromdate,
                    city: user.ui_city,
                    shop: {
                        shop_name: user.s_shop_name,
                        address_shop: user.s_adress_shop,
                        score: user.s_score,
                        listing: user.s_listing
                    },
                    top_comments: comments.map((cmt) => {
                        return {
                            id: cmt.cmt_id,
                            comment: cmt.cmt_content,
                            created: cmt.cmt_fromdate,
                            poster: {
                                id: cmt.cmt_user_id,
                                name: cmt.ui_name,
                                avatar: cmt.ui_avartar
                            }
                        }
                    })
                }
                res.json(resuilt);
            })

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
                username: user.u_user_name,
                name: user.ui_name,
                avartar: user.ui_avartar,
                type: user.u_type,
            }

            let token = jwt.sign({
                data: payload
            }, key, { expiresIn: survival_time });

            let result = response.OK

            result.data = {
                id: user.u_id,
                name: user.ui_name,
                username: user.u_user_name,
                avartar: user.ui_avartar,
                token: token
            }

            return res.json(result)
        });
    },

    changePassword: function (req, res) {
        let user_id = req.session.user_id;
        let old_password = req.param('old_password');
        let new_password = req.param('new_password');
        
        let old_password_MD5 = md5(old_password);
        let new_password_MD5 = md5(new_password);

        StoredProcedure.query('call moki.checkPassword(?, ?)', [user_id, old_password_MD5], function (err, [data, server_status]) {
            if (err) {
                return res.json(err)
            }

            if(!!data && data.length == 1 && data[0].u_id==user_id) {
                StoredProcedure.query('call moki.changePassword(?, ?)', [user_id, new_password_MD5], function (err, [data, server_status]) {
                
                    if(!!data && data.length == 1 && data[0].u_id==user_id && data[0].u_token==new_password_MD5) {
                        return res.json(response.OK)
                    } else {
                        return res.json(response.NO_DATA_OR_END_OF_LIST_DATA)
                    }
                })
            } else {
                return res.json(response.NO_DATA_OR_END_OF_LIST_DATA)
            }
        });
    },

    checkLogin: function (req, res) {
        let user_id = req.session.user_id;

        let user_agent = req.headers['user-agent'] || "anonymous";

        StoredProcedure.query('call moki.checkLogin(?, ?)', [user_id, user_agent], function (err, [data, server_status]) {
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

