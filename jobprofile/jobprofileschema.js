var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobProfileSchema = new Schema({
    'jobRole': { type: String, required: true },
    'departmentName': { type: String, required: true },
    'jobID': { type: String, required: true, index: true },
    'employer': {
        'employerID': { type: String, index: true, required: true },
        'employerName': { type: String, required: true },
        'employerLogo': String,
        'aboutEmployer': String,
    },
    'jobLocation': { type: String, required: true },
    'skillsRequired': [{
        'skillName': String,
        'experience': String,
    }],
    'experience': { 'experienceYear': String, 'experienceMonth': String },
    'jobPostDate': Date,
    'jobLastDate': Date,
    'salaryOffered': String,
    'roleDescription': String,
    'educationRequired': [{
        'courseName': String,
        'yearOfPassing': String,
        'minimumPercentage': String
    }],
    'certificationRequired': [String],
    'contactDetails': [{
        'contactPerson': String,
        'contactNumber': String,
        'emailID': String
    }],
    'anyOtherInformation': String,
    'verificationStatus': String,
    'verificationRatings': String,
    'JobStatus': String
});
jobProfileSchema.index({
    employer: { employerID: 1 },
    jobID: 1
}, { unique: true });
var jobProfile = mongoose.model('jobProfiles', jobProfileSchema, 'jobProfiles')
module.exports = jobProfile;
