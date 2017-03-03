let mongoose = require('mongoose');

let gallery = require('./galleryschema');
 
let galleryneoprocessor = require("./galleryneoprocessor");

function addGallery(formObj, successCB, errorCB) {
		// This is a asynch op
		// Go to DB and fetch record for specified empid
		console.log("filename:");
		console.log(formObj.FILENAME);
				let galleryObj = {
					url: formObj.URL,
					title: formObj.TITLE,
					desc: formObj.DESC,
					filename: formObj.FILENAME
							}
		gallery.update({ candidateid: formObj.CANDIDATEID }, { $push:
                                { gallery: galleryObj } },function(err, result) {
				if (err) {
						errorCB(err);
				}
				successCB(result);

				// Asynch method
				// Save empObj to DB
		});
		
}

function getGallery(candidateid, successCB, errorCB) {
	gallery.find({
		candidateid: candidateid
	}, function(err, galleryObj) {
		if (err) {
			errorCB(err);
		} 
		successCB(galleryObj);
		console.log("GOT GALLERY OBJ!!!");
	});
}


// add gallery for the first time when no records are present by creating records
function createNewGallery(formobj, sucessCB, errorCB) {
		let galleryObj = new gallery({
				candidateid: formobj.mobile,
				gallery: []
		});

		galleryObj.save(function(err, result) {
				if (err) {
						errorCB(err);
				}
				sucessCB(result);

				// Asynch method
				// Save empObj to DB
		});
}

function deleteImage(candidateid,imageTitle,successCB,errorCB){
		if (mongoose.connection.readyState == 1) {
        
        gallery.update({ candidateid: candidateid }, {
        $pull: { gallery: { title: imageTitle } }
    }, function() {
                        successCB('image object deleted from candidate gallery!!!!');
                }
    );//end mongoose update function

    } else {
        
        errorCB(err);
    }
}


module.exports = {
		getGallery: getGallery,
		createNewGallery: createNewGallery,
		addGallery: addGallery,
		deleteImage: deleteImage
		
};

