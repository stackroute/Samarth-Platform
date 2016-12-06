var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var jobSchema   = new Schema({
    // include jobID: { type: String, required: true, index: true },
    title : { type : String, required : true},
    role : { type : String, required : true},
    duties : { type : String, required : true},
    location : { type : String, required : true},
    experience : { type : String, required : true},
    allowance : { type : String, required : true},
    language : [{ name : String, read : String, write : String, speak : String}],
    closedate : { type : String, required : true},
    skills : [{name : String, expertise : String, priority : String}],
    salary :{ type : String, required : true},
    openings :{type : String, required: true},
    qualifications :[{name : String, score: String, priority : String}],
});

module.exports = mongoose.model('job', jobSchema);