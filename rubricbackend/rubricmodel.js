let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*
rubric schema
*/

let rubricSchema = new Schema({
    scale: [String],
    type: [{
        name: String,
        columns: [{
            title: String,
            checklist: [String],
            desc: String,
            value: Number

        }],
        model: Number
    }]


});

let rubric = mongoose.model('rubricmodel', rubricSchema, 'profileRubric');
module.exports = rubric;


