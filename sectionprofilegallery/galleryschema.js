let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let gallerySchema = new Schema({ 
	candidateid: {type: String, required: true},
	gallery: [{
		url: { type: String, required: true },
		title: { type: String, required: true },
		desc: { type: String, required: true },
		uploadedon: {type: Date, default: Date.now()}
	}]
});
let gallery = mongoose.model('gallery', gallerySchema, 'profilegallery');
module.exports = gallery;

