let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let skillSchema = new Schema({
	candidateid: {type: String, required: true},
    skills: [{
        skillname: { type: String, required: true},
        category: { type: String, required: true },
        expertise: { type: String, required: true },
        experience: { type: Number, required: true, min: 0 },
        metadata: {type: Array, default: []}
    }]
});

let skill = mongoose.model('skill', skillSchema, 'skills');

module.exports = skill;
