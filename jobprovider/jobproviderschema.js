let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let jobproviderschema = new Schema({
    // employerName: { type: String, required: true },
    // employerID: { type: String, required: true, unique: true },
    // aboutEmployer: { type: String, required: true },
    // emailID: { type: String, required: true },
    // contactNumber: { type: String, required: true },
    // employerLogo: { type: String }
    // ID:{ type: String, required: true, unique: true},
    jpCode: {type : Number, required:true, unique:true},
    name: { type: String},
    type: { type: String },
    location: { type: String },
    phone: { type: String},
    email: { type: String },
    about: { type: String }
});
let jobprovider = mongoose.model('jobprovider', jobproviderschema, 'jobprovider');
module.exports = jobprovider;
