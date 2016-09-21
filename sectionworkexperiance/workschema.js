var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workSchema = new Schema({
	'candidateid':{type:String ,required:true},
    'workexperience': [{
        'yearexp': { type: String, required: true ,default:0,min:0},
        'organisation': { type: String, required: true },
        'role': { type: String, required: true },
        'workplace': { type: String, required: true },
        'Location': { type: String, required: true }
    }]


});
var work = mongoose.model('work', workSchema, 'Work_History');
module.exports = work;
