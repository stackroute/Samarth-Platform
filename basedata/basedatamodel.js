var mongoose = require('mongoose');

var sidenav = mongoose.Schema({
    role: { type: String, required: true },
    sidenavmenuitems: [{ name: String, state: String, icon: String }]
}); //sidenav ends

var sidenavcontent = mongoose.model('sidenavcontents', sidenav, 'sidenavcontents');

module.exports = sidenavcontent;
