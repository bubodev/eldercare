const passport = require('passport'),  
			User = require('../models/user'),
			config = require('./main'),
			JwtStrategy = require('passport-jwt').Strategy,
			ExtractJwt = require('passport-jwt').ExtractJwt,
			LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };  

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
  User.findOne({ email: email }, function(err, user) {
		if(err) { return done(err); }
		if(!email) { return done(null, false, { error: 'Please enter your email.' }); }
		if(!password) { return done(null, false, { error: 'Please enter your password.' }); }
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});

const jwtOptions = {  
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwt = new JwtStrategy(jwtOptions, function(payload, done) { 
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwt);  
passport.use(localLogin);  


// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
// // load up the user model
// var User = require('../models/user');
// var config = require('../config/main'); // get db config file

// module.exports = function(passport) {
//  var opts = {};
//  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//  opts.secretOrKey = config.secret;
//  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// 	 User.findOne({id: jwt_payload.id}, function(err, user) {
// 				 if (err) {
// 						 return done(err, false);
// 				 }
// 				 if (user) {
// 						 done(null, user);
// 				 } else {
// 						 done(null, false);
// 				 }
// 		 });
//  }));
// };