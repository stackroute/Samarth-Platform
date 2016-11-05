let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let coordinatorSchema = new Schema({

    coordinatorName: { type: String },
    coordinatorId: { type: String, unique: true, required: true },
    coordinatorRole: { type: String },
    coordinatorProfession: { type: String },
    coordinatorLocation: { type: String },
    coordinatorGender: { type: String },
    coordinatorEmail: { type: String },
    coordinatorPwd: { type: String }
});
let coordinator = mongoose.model('coordinators', coordinatorSchema, 'coordinators');

module.exports = coordinator;
