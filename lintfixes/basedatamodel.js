let mongoose = require('mongoose');

let sidenav = mongoose.Schema({
    role: { type: String, required: true },
    sidenavmenuitems: [{ name: String, state: String, icon: String }]
}); // sidenav ends

let sidenavcontent = mongoose.model('sidenavcontents', sidenav, 'sidenavcontents');

module.exports = sidenavcontent;
