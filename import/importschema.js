let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let importSchema = new Schema({
	'profileType': [ {type: String} ],
	'submittedOn': { type: Date, default: Date.now},
	'status': [ {type: String} ],
	'data': {type: Object},
	'fileName': {type: String}
});
let import = mongoose.model('import', importSchema, 'import');
module.exports = import;
