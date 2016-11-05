let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let workSchema = new Schema({
	candidateid: {type: String, required: true},
    workexperience: [{
        designation: { type: String, required: true },
        workplace: { type: String, required: true },
        Location: { type: String, required: true },
        duration: {
        	from: {type: Date},
        	to: {type: Date},
        	duration: {type: String}
        },
        skills: {type: Array}
    }]


});
let work = mongoose.model('work', workSchema, 'workhistory');
module.exports = work;
