const jwt = require('jsonwebtoken');
const {key, survival_time} = require ('../util/jwt');

module.exports = function (req, res, next) {
    var token = req.headers['authorization'];
    // If the requesting user is not logged in, then they are _never_ allowed to write.
    // No reason to continue-- we can go ahead and bail out now.

    if (!token) {
        res.status(401);
        res.json({
            code: "1009",
            message: "Not access."
        })
        return res;
    }
    let check = false;
    let data = {};
    jwt.verify(token, key, function(err, decoded) {
        if(!err) {
            check = true
            data = decoded.data
            
        }
    })

    if(!check) {
        res.status(401);
        res.json({
            code: "1009",
            message: "Not access."
        })
        return res;
    }

    // Check the database to see if a permission record exists which matches both the
    // target folder id, thnpm install jsonwebtokene appropriate "type", and the id of the logged-in user.

    var { user_id, user_code, type } = data;

    if (type == "ADMIN") {
        req.session.user_id = user_id;
        req.session.user_code = user_code;
        return next();
    } else {
        res.status(404);
        res.json({
            code: "1009",
            message: "Not access."
        })
        return res;
    }

};