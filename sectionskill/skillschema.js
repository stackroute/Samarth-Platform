var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var skillSchema = new Schema({
    'skills': [{
        'skillname': { type: String, required: true},
        'category': { type: String, required: true },
        'expertise': { type: String, required: true },
        'experience': { type: Number, required: true, min: 0 },
        'metadata':{type:Array ,default:[]}
    }]
});

var skill = mongoose.model('skill', skillSchema, 'profiles');

module.exports = skill;
