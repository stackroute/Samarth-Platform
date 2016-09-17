var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    
    'projects': [{
        'name': { type: String, required: true },
        'workplace': { type: String },
        'location': { type: String },
        'income': { type: Number },
        'duration': {
            'from': { type: Date },
            'to': { type: Date },
            'duration': { type: String }
        },
        'skills': { type: Array },
        'meta': { type: Array }
    }]
});

var project = mongoose.model('project', projectSchema, 'profiles');

module.exports = project;
