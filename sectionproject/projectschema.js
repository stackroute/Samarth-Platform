var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    'candidateid':{type:String ,required:true},
    'projects': [{
        'name': { type: String, required: true },
        'workplace': { type: String },
        'location': { type: String },
        'income': { type: Number ,min:0},
        'duration': {
            'from': { type: Date },
            'to': { type: Date },
            'duration': { type: String }
        },
        'skills': { type: Array },
        'meta': { type: Array }
    }]
});

var project = mongoose.model('project', projectSchema, 'SectionProject');

module.exports = project;
