const jwt = require('jsonwebtoken');

module.exports = function canWrite (req, res, next) {
    var token = req.param('token');
    // If the requesting user is not logged in, then they are _never_ allowed to write.
    // No reason to continue-- we can go ahead and bail out now.
    /**
    if (!token || jwt.sign(token)) {
      //return res.redirect('/login');
      res.status(401);
      res.json({
        code: "1009",
        message: "Not access."
      })
      return res;
    }
     */
    // Check the database to see if a permission record exists which matches both the
    // target folder id, thnpm install jsonwebtokene appropriate "type", and the id of the logged-in user.
    
    // var [header, payload, verify_signature] = token.split(".")
    // console.log(header, payload, verify_signature)
    // console.log("payload", Buffer.from(payload, 'base64').toString())
    //res.set('Access-Control-Allow-Origin', "*");
    return next();
    /**
    Permission.findOne({
      folder: targetFolderId,
      user: req.session.me,
      type: 'write'
    })
    .exec(function (err, permission) {
  
      // Unexpected error occurred-- use the app's default error (500) handler.
      //
      // > We do this because this should never happen, and if it does, it means there
      // > is probably something wrong with our database, and we want to know about it!)
      if (err) { return res.serverError(err); }
  
      // No "write" permission record exists linking this user to this folder.
      // Maybe they got removed from it?  Or maybe they never had permission in the first place...
      if (!permission) {
        return res.redirect('/login');
      }
  
      // If we made it all the way down here, looks like everything's ok, so we'll let the user through.
      // (from here, the next policy or the controller action will run)
      return next();
  
    });
     */
  };