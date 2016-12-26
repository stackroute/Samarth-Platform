var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var jobSchema   = new Schema({
    jobcode: { type: String, required: true, unique:true},
    jobprovider: { type: String , required: true},
    title : { type : String},
    profession : [{type: String}],
    role : { type : String},
    duties : { type : String},
    location : { type : String},
    experience : { type : String},
    allowance : { type : String},
    languages: [
        {   name: {type : String},
            speak: {type : Boolean}, 
            read: {type : Boolean}, 
            write: {type : Boolean}
        }
    ],
    closedate : { type : Date},
    skills : [{name : String, expertise : String, priority : String}],
    salary :{ type : String},
    openings :{type : String},
    qualifications :[{name : String, score: String, priority : String}],
    placements:[{
       candidateid : { type: String, required : true},
       appliedBy: {type:String},
       appliedOn :{type:String},
       status    :{type:String},
       offeredOn :{type:String},
       offeredBy : {type:String},
       joinedOn  :{type:String}
     }]
});

module.exports = mongoose.model('job', jobSchema);
