var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coordinatorSchema = new Schema({

    coordinatorName: { type: String },
    coordinatorId: { type: String, unique: true, required: true },
    coordinatorRole: { type: String },
    coordinatorLocation: { type: String },
    coordinatorGender: { type: String },
    coordinatorEmail:{type:String},
    coordinatorPwd:{type:String}
});
var coordinator = mongoose.model('coordinator', coordinatorSchema, 'coordinator')

module.exports = coordinator;
