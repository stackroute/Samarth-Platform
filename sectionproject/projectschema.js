let mongoose = require('mongoose');
let Schema = mongoose.Schema;
 
let projectSchema = new Schema({

    candidateid: { type: String, required: true },
    projects: [{
        name: { type: String, required: true },
        workplace: { type: String, required: true }, //@TODO
        location: { type: String },
        income: { type: Number, min: 0 },
        duration: {
            from: { type: Date },
            to: { type: Date },
            durationInMonths: { type: String }
        },
        'skills': { type: Array },
        'meta': { type: Array }
    }]
});


let project = mongoose.model('project', projectSchema, 'projects');


module.exports = project;
