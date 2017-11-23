const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = req.param('token');
    // If the requesting user is not logged in, then they are _never_ allowed to write.
    // No reason to continue-- we can go ahead and bail out now.

    if (!token || jwt.sign(token)) {
        //return res.redirect('/login');
        res.status(401);
        res.json({
            code: "1009",
            message: "Not access."
        })
        return res;
    }

    // Check the database to see if a permission record exists which matches both the
    // target folder id, thnpm install jsonwebtokene appropriate "type", and the id of the logged-in user.

    var [header, payload, verify_signature] = token.split(".")
    var payload = Buffer.from(payload, 'base64').toString();
    var { user_id, user_code, type } = JSON.parse(payload);

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