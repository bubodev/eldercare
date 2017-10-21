module.exports = {  
	// Secret key for JWT signing and encryption
  'secret': 'I can never understand women',
  // Database connection information
  'database': 'mongodb://localhost:27017/eldercare',
  // Setting port for server
  'port': process.env.PORT || 3001
}