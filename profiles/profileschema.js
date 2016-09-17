var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profileSchema = new Schema({
     
        candidateid: { type: String, required: true, unique: true },
        candidateType: { type: String },
        createdOn: { type: Date},
        updatedOn: { type: Date},
        projects:{type:Array},
        skills:{type:Array},
        projects:{type:Array},
        qualification:{type:Array},
        workexperience:{type:Array},
        personalinfo:{type:Array}
});
var profiles=mongoose.model('profiles',profileSchema,'profiles')
module.exports = profiles;
