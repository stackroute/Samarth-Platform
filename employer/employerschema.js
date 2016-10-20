var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employerSchema = new Schema({
    employerName: { type: String, required: true },
    employerID: { type: String, required: true, unique: true },
    aboutEmployer: { type: String, required: true },
    emailID: { type: String, required: true },
    contactNumber: { type: String, required: true },
    employerLogo: { type: String }
});
var employer = mongoose.model('employers', employerSchema, 'employers')
module.exports = employer;
