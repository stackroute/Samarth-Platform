var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var jobSchema   = new Schema({
    jobcode: { type: String, required: true, unique:true},
    jobprovider: { type: String , required: true},
    title : { type : String},
    role : { type : String},
    duties : { type : String},
    location : { type : String},
    experience : { type : String},
    allowance : { type : String},
    language : [{ name : String, read : String, write : String, speak : String}],
    closedate : { type : String},
    skills : [{name : String, expertise : String, priority : String}],
    salary :{ type : String},
    openings :{type : String},
    qualifications :[{name : String, score: String, priority : String}],
});

module.exports = mongoose.model('job', jobSchema);
