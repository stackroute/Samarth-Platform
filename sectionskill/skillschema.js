let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let skillSchema = new Schema({
	candidateid: {type: String, required: true},
    skills: [{
        skillname: { type: String, required: true},
        // category: { type: String},
        expertise: { type: String},
        experience: { type: Number, min: 0 ,max:99 },
        metadata: {type: Array, default: []}
    }]
});

let skill = mongoose.model('skill', skillSchema, 'skills');

module.exports = skill;
