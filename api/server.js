// Importing Node modules and initializing Express
const express = require('express'),  
			app = express(),
			bodyParser = require('body-parser'),
			logger = require('morgan'),
			mongoose = require('mongoose'),
			config = require('./config/main'),
			router = require('./router'),  
			passport = require('passport');
// Database Connection
mongoose.connect(config.database, { useMongoClient: true });  

const server = app.listen(config.port);  
console.log('Your server is running on port ' + config.port + '.');  

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);  




// var express     = require('express');
// var app         = express();
// var bodyParser  = require('body-parser');
// var morgan      = require('morgan');
// var mongoose    = require('mongoose');
// var passport	= require('passport');
// var config      = require('./config/main'); // get db config file
// var User        = require('./models/user'); // get the mongoose model
// var port        = process.env.PORT || 3001;
// var jwt         = require('jwt-simple');
 
// // get our request parameters
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
 
// // log to console
// app.use(morgan('dev'));
 
// // Use the passport package in our application
// app.use(passport.initialize());
// app.use(function(req, res, next) {  
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
// // demo Route (GET http://localhost:8080)
// app.get('/', function(req, res) {
//   res.send('Hello! The API is at http://localhost:' + port + '/api');
// });
 
// // Start the server
// app.listen(port);
// console.log('There will be dragons: http://localhost:' + port);

// // connect to database
// mongoose.connect(config.database);

// // pass passport for configuration
// require('./config/passport')(passport);

// // bundle our routes
// var apiRoutes = express.Router();

// // create a new user account (POST http://localhost:8080/api/signup)
// apiRoutes.post('/signup', function(req, res) {
//  if (!req.body.name || !req.body.password) {
// 	 res.json({success: false, msg: 'Please pass name and password.'});
//  } else {
// 	 var newUser = new User({
// 		 name: req.body.name,
// 		 password: req.body.password
// 	 });
// 	 // save the user
// 	 newUser.save(function(err) {
// 		 if (err) {
// 			 return res.json({success: false, msg: 'Username already exists.'});
// 		 }
// 		 res.json({success: true, msg: 'Successful created new user.'});
// 	 });
//  }
// });

// // route to authenticate a user (POST http://localhost:8080/api/authenticate)
// apiRoutes.post('/authenticate', function(req, res) {
//   User.findOne({
//     email: req.body.email
//   }, function(err, user) {
//     if (err) throw err;
 
//     if (!user) {
//       res.send({success: false, msg: 'Authentication failed. User not found.'});
//     } else {
//       // check if password matches
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           var token = jwt.encode(user, config.secret);
//           // return the information including token as JSON
//           res.json({success: true, token: 'JWT ' + token});
//         } else {
//           res.send({success: false, msg: 'Authentication failed. Wrong password.'});
//         }
//       });
//     }
//   });
// });
// // route to a restricted info (GET http://localhost:8080/api/memberinfo)
// apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
// 	var token = getToken(req.headers);
// 	console.log(token)
//   if (token) {
//     var decoded = jwt.decode(token, config.secret);
//     User.findOne({
//       name: decoded.name
//     }, function(err, user) {
//         if (err) throw err;
 
//         if (!user) {
//           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
//         } else {
//           res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
//         }
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'No token provided.'});
//   }
// });
 
// getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };
// // connect the api routes under /api/*
// app.use('/api', apiRoutes);