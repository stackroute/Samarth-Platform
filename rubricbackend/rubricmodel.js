var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
rubric schema
*/

var rubricSchema = new Schema({
    'name': { type: String, require: true }, //name of rubric  - candidate / job
    'profiletype': { type: String, require: true }, //the type of data in the rubric - Profession namely
    'criteria': [{
        'name': String, //The Right-Side Headings in the Rubric
        'columns': [
            { 'title': String, 'desc': String, 'value': Number }
        ],
        'headers': [{ type: String }], //The Top headers in the rubric with the description and value
        'model': Number // The selected value of the rubric
    }]


});

var rubric = mongoose.model('rubricmodel', rubricSchema, 'profileRubric')
module.exports = rubric;
