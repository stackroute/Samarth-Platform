let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let candidateSchema = new Schema({

	candidateid: { type: String, required: true, unique: true },
	createdOn: { type: Date, default: Date.now},
	updatedOn: { type: Date, default: Date.now},
	createdBy: {type: String, default: 'user'},
	updatedBy: {type: String, default: 'user'}
});
let candidates = mongoose.model('candidates', candidateSchema, 'candidates');
module.exports = candidates;
