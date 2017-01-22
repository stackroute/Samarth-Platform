let mongoose = require('mongoose');
let Schema = mongoose.Schema; 
 
let jobpreferencesSchema = new Schema({

       candidateid: { type: String, required: true, unique:true },
       preferences: [{
       looking_jobs: { type: String,default: "No"},
       roles: { type: Array, required: true},
       locations: { type: Array,required: true},
       skills: { type: Array , required: true},
       expected_salary: { type: String},
       engagement_type: {type: String},
       joining_date: {type: Date}
     }]
   
});
let preference = mongoose.model('candidatePreference', jobpreferencesSchema, 'candidatePreferences');


module.exports = preference;
