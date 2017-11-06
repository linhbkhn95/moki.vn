/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'index': function (req, res) {
        var phone = req.param('phone');
        var password = req.param('password');
        console.log(phone + password);

        if (!phone || !password) {
          return res.json(401, {err: 'phone and password required'});
        }

        User.findOne({phone: phone}, function (err, user) {
          if (!user) {
            console.log(phone);
            return res.json(401, {err: 'invalid phone or password'});
          }

          User.comparePassword(password, user, function (err, valid) {
            if (err) {
              return res.json(403, {err: 'forbidden'});
            }

            if (!valid) {
              return res.json(401, {err: 'invalid phone or password'});
            } else {
            
              res.json({
                user: user,
                token: jwToken.issue({id : user.id,username:user.name })
              });
            }
          });
        })
      }
};

