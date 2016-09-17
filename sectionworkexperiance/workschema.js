var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workSchema = new Schema({
    'workexperience': [{
        'yearexp': { type: String, required: true },
        'organisation': { type: String, required: true },
        'role': { type: String, required: true },
        'workplace': { type: String, required: true },
        'Location': { type: String, required: true }
    }]


});
var work = mongoose.model('work', workSchema, 'profiles');
module.exports = work;
