let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let profileSchema = new Schema({

	candidateid: { type: String, required: true, unique: true },
	candidateType: { type: String, default: 'Job Seeker' },
	createdOn: { type: Date, default: Date.now},
	updatedOn: { type: Date, default: Date.now},
	createdBy: {type: String, default: 'user'},
	updatedBy: {type: String, default: 'user'},
	profession: {type: String},
	completion: {
		overall: {type: Number, default: 10 },
		sections: {}
	}
});

let profiles = mongoose.model('profiles', profileSchema, 'profiles');
module.exports = profiles;
