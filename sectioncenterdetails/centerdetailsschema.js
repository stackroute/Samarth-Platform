let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CenterDetailsSchema = new Schema({

    centerCode: { type: String, required: true, unique: true },
    location: { type: String },
    address: { type: String },
    mobile: { type: Number, required: true },
    cname: { type: String },
    centerType: { type: String, enum: ['Headquarter','Regional','Nodal'] },
    status: { type: String }
    // createdAt: { type: String },
    // updatedOn: { type: String }
});
let centerModl = mongoose.model('centerdetails', CenterDetailsSchema);
module.exports = centerModl;
