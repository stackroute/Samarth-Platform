let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let importsSchema = new Schema({
	'profileType': [ {type: String} ],
	'submittedOn': { type: Date, default: Date.now},
	'status': [ {type: String} ],
	'data': {type: Array},
	'fileName': {type: String}
});
let imports = mongoose.model('imports', importsSchema, 'imports');
module.exports = imports;
