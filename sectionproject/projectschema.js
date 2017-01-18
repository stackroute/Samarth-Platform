let mongoose = require('mongoose');
let Schema = mongoose.Schema; 
// const DURATION_UNIT_CONSTS = ['months', 'years', 'days'] ;
let projectSchema = new Schema({

    candidateid: { type: String, required: true },
    projects: [{
        name: { type: String, required: true },
        durationInMonths: { type: Number, min:0, max:99},
        // duration: { type: Number },
        // durationUnit: { type: String, enum: DURATION_UNIT_CONSTS, default: 'months' },
        location: { type: String, required: true }, //@TODO
        skills: { type: Array, required: true },
        client: { type: String },
        role: { type: String }
    }]
});

let project = mongoose.model('project', projectSchema, 'projects');

module.exports = project;
