var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var candidateSchema = new Schema({
	
	candidateid: { type: String, required: true, unique: true },
	createdOn: { type: Date,default:Date.now},
	updatedOn: { type: Date,default:Date.now},
	createdBy:{type:String,default:"user"},
	updatedBy:{type:String,default:"user"},
	// profession:{type: String,required: true}
});
var candidates=mongoose.model('candidates',candidateSchema,'candidates')
module.exports = candidates;
