var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
verification schema
*/

var verificationSchema = new Schema({
    'candidateid': { type: Number, require: true },
    'verification_status': { type: String },
    'verification_ratings': { type: Number }



});

var verification = mongoose.model('verificationmodel', verificationSchema, 'verificationcandidate')
module.exports = verification;
