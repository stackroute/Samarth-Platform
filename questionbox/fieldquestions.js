var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    'section': { type: String, required: true },
    'fieldname': { type: String, required: true },
    'query': { type: String, required: true },
    'lang': { type: String, required: true }
});

//composite  unique key
schema.index({
    section: 1,
    fieldname: 1,
    query: 1,
    lang: 1
}, { unique: true });

module.exports = mongoose.model('fieldquestions', schema, 'fieldquestions');
