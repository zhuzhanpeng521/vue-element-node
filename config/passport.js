const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose")
const User = mongoose.model("users")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   User.findOne({_id: jwt_payload.id})
   .then( user => {
     if( user ){
      return done(null, user)
     }else {
       return done(null, false)
     }
   })
   .catch(err => console.log(err))
  console.log(jwt_payload.id)
}));
}