var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var circleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    circleDiscription: { type: String },
    domain: { type: String },
    circleType: { type: String, require: true },
    visuality: { type: String, require: true },
    profilePic: { type: String }
}, { collection: 'circle' });

module.exports = circleSchema;

// var circle = mongoose.model('Circle', circleSchema);
// module.exports = circle;
//     name: req.body.name,
//        circleDiscription: req.body.circleDiscription,
//        domain:req.body.domain
//        circleType: req.body.circleType,
//        visuality:req.body.visuality,
//        admin:req.body.admin,
//        profilePic:req.body.profilePic,
