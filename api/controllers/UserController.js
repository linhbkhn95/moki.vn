/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const key = "nhom4";
const survival_time = 60*60*24*60;
const jwt = require('jsonwebtoken');
const response = require ('../util/response');

module.exports = {
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
        let pwdMD5 = req.param('password');
        User.findOne({
            user_name: userName,
            u_token: pwdMD5
        }).populate('information').exec(function (err, user) {
            
            if (err) {
                return res.json(err)
            }
            if(!user) {
                return res.json(err)
            }
            var payload = {
                user_id: user.user_id,
                user_code: user.user_code,
                type: user.type,
            }
            
            let token = jwt.sign({
                data: payload
            }, key, { expiresIn: survival_time });

            result = response.OK

            result.data = {
                id: user.user_id,
                username: user.user_name,
                avartar: user.information[0].avartar,
                token: token
            }
            
            return res.json(result)
        })
    }
};

