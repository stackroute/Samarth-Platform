let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CenterDetailsSchema = new Schema({

    reg: { type: String, required: true },
    location: { type: String },
    address: { type: String },
    mobile: { type: Number, required: true },
    name: { type: String },
    centertype: { type: String },
    status: { type: String }
});
let centerModl = mongoose.model('centerdetails', CenterDetailsSchema);
module.exports = centerModl;
