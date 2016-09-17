var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CandidatesSchema = new Schema({
 "name": {type:String},
  "phonenumber": {type:Number},
    "language":{type:String},
    "email":{type:String}
    
}, { collection: "candidate" });
module.exports = CandidatesSchema;
