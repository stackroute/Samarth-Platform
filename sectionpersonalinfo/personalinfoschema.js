var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalInfoSchema = new Schema({

    candidateid: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    maritialstatus: { type: String },
    mothertongue: { type: String, default: 'english' },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String },
    location: { type: String },
    pincode: { type: Number }


});
var personModl = mongoose.model('personModl', PersonalInfoSchema, 'personalinfo');
module.exports = personModl;
