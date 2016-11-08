let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let employerSchema = new Schema({
    employerName: { type: String, required: true },
    employerID: { type: String, required: true, unique: true },
    aboutEmployer: { type: String, required: true },
    emailID: { type: String, required: true },
    contactNumber: { type: String, required: true },
    employerLogo: { type: String }
});
let employer = mongoose.model('employers', employerSchema, 'employers');
module.exports = employer;
