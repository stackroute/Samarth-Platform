var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rubricSchema = new Schema({
            'name': { type: String, require: true },
            'profiletype': { type: String, require: true },
            'criteria': [{ 'name': String, 'value': String }, { 'name': String, 'value': integer }]


        };

        var rubric = mongoose.model('rubricmodel', rubricSchema, 'profileRubric')
        module.exports = rubric;
