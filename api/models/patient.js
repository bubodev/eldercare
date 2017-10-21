const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
	identification: { 
		typeOfId:{ type: String },
		id: { type: String }
	},
	profile: {
		firstName: { type: String },
		lastName: { type: String },
		DOB: { type: Date }
	}
})

module.exports = mongoose.model('Patient', PatientSchema);  