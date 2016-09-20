var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
        candidateid: { type: String, required: true, unique: true },
        questions:{type:Array}
});

var question=mongoose.model('question',questionSchema,'questions')
module.exports = question;
