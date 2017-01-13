let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PersonalInfoSchema = new Schema({

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
    pincode: { type: Number },
    profilepic:{ type:String, 
        default: 'http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg'}

});
let personModl = mongoose.model('personModl', PersonalInfoSchema, 'personalinfo');
module.exports = personModl;
