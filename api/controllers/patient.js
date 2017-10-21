const Patient = require('../models/patient');

//= =======================================
// User Routes
//= =======================================
exports.allPatients = function (req, res, next) {
  Patient.find({}, (err, patient) => {
    if (err) {
      res.status(400).json({ error: 'No patients were found.' });
      return next(err);
    }
		return res.status(200).json({ patients: patient });
	});
};

exports.addPatient = function(req, res, next){

	const typeOfId = req.body.typeOfId;
	const id = req.body.id;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const DOB = req.body.DOB;

	const patient = new Patient({
		identification: { typeOfId, id },
		profile: { firstName, lastName, DOB }
	});
	patient.save((err, patient) => {
		if (err) { return next(err); }
		
		res.status(201).json({
			message: firstName + ' patient added'
		});
		
	});
};