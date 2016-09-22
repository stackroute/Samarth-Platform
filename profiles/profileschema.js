var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profileSchema = new Schema({
     
        candidateid: { type: String, required: true, unique: true },
        candidateType: { type: String,default:"Job Seeker" },
        createdOn: { type: Date,default:Date.now},
        updatedOn: { type: Date,default:Date.now},
        createdBy:{type:String,default:"user"},
        updatedBy:{type:String,default:"user"}
       
});
var profiles=mongoose.model('profiles',profileSchema,'profiles')
module.exports = profiles;
