const AuthenticationController = require('./controllers/authentication'),  
			UserController = require('./controllers/user'),
			PatientController = require('./controllers/patient'),
			express = require('express'),
			passportService = require('./config/passport'),
			passport = require('passport'),
			User = require('./models/user'),
			JwtStrategy = require('passport-jwt').Strategy,
			ExtractJwt = require('passport-jwt').ExtractJwt,
			LocalStrategy = require('passport-local'),
			config = require('./config/main');
// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// Constants for role types
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;





// Setting up JWT login strategy

module.exports = function(app) {  
	// Initializing route groups
	const apiRoutes = express.Router(),
				authRoutes = express.Router(),
				userRoutes = express.Router(),
				patientRoutes = express.Router();

	//test routes
	apiRoutes.get('/protected', requireAuth, (req, res) => {
		res.send({ content: 'The protected test route is functional!' });
	});
	//= ========================
	// Auth Routes
	//= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
	// Registration route
	//authRoutes.post('/register', AuthenticationController.register);
	// Login route
	authRoutes.post('/login', requireLogin, AuthenticationController.login);
	// // Password reset request route (generate/send token)
	authRoutes.post('/forgot-password', AuthenticationController.forgotPassword);

	// // Password reset route (change password using token)
	// authRoutes.post('/reset-password/:token', AuthenticationController.verifyToken);
	//= ========================
	// User Routes
	//= ========================

	// Set user routes as a subgroup/middleware to apiRoutes
	apiRoutes.use('/user', userRoutes);

	userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

	// apiRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
	// 	res.send({ content: 'Admin dashboard is working.' });
	// });
	
	//= ========================
	// Patient Routes
	//= ========================

	apiRoutes.use('/patient', patientRoutes);

	patientRoutes.get('/all', PatientController.allPatients);

	patientRoutes.post('/addPatient', PatientController.addPatient)

	// Set url for API group routes
	app.use('/api', apiRoutes);
};