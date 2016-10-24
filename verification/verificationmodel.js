var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
verification schema
*/

var verificationSchema = new Schema({
    'candidateid': { type: Number, require: true },
    'updated_on': { type: Date },
    'Personal_Information': { 'value': Number, 'remarks': String },
    'Skills': { 'value': Number, 'remarks': String },
    'Qualification': { 'value': Number, 'remarks': String },
    'Project': { 'value': Number, 'remarks': String },
    'Work_History': { 'value': Number, 'remarks': String }



});

var verification = mongoose.model('verificationmodel', verificationSchema, 'verificationcandidate')
module.exports = verification;
