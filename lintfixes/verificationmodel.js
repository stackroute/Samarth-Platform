let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*
verification schema
*/

let verificationSchema = new Schema({
    candidateid: { type: Number, require: true },
    candidatename: { type: String, require: true },
    updated_on: { type: Date },
    Personal_Information: { value: { type: Number, default: 0 }, remarks: { type: String, default: '' } },
    Skills: { value: { type: Number, default: 0 }, remarks: { type: String, default: '' } },
    Qualification: { value: { type: Number, default: 0 }, remarks: { type: String, default: '' } },
    Project: { value: { type: Number, default: 0 }, remarks: { type: String, default: '' } },
    Work_History: { value: { type: Number, default: 0 }, remarks: { type: String, default: '' } }


});

let verification = mongoose.model('verificationmodel', verificationSchema, 'verificationcandidate');
module.exports = verification;
