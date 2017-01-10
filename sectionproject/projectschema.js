let mongoose = require('mongoose');
let Schema = mongoose.Schema; 
 
let projectSchema = new Schema({

    candidateid: { type: String, required: true },
    projects: [{
        name: { type: String, required: true },
        durationInMonths: { type: String },
        location: { type: String, required: true }, //@TODO
        skills: { type: Array, required: true },
        client: { type: String },
        role: { type: String }
    }]
});


let project = mongoose.model('project', projectSchema, 'projects');


module.exports = project;
