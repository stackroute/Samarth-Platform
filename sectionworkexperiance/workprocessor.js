let mongoose = require('mongoose');

let work = require('./workschema');
 
let workneoprocessor = require("./workneoprocessor");

function getworkexp(candidateid, successCB, errorCB) {
		// This is a asynch op
		// Go to DB and fetch record for specified empid

		work.find({ candidateid: candidateid }, function(err, workexps) {
				if (err) {
						errorCB(err);
				}
				successCB(workexps);
		}); 
}

// add workexp for the first time when no records are present by creating records
function createworkexp(formobj, sucessCB, errorCB) {
		let wrkexpObj = new work({
				candidateid: formobj.mobile,
				workexperience: []
				// workexperience: formobj.workexperience.length!=0 ? formobj.workexperience : []
		});

		wrkexpObj.save(function(err, result) {
				if (err) {
						errorCB(err);
				}
				sucessCB(result);

				// Asynch method
				// Save empObj to DB
		});
}

// add skills into the existing records
// , errorCB
function addworkexp(wsObj, candidateid, sucessCB) {
		//console.log(mongoose.connection.readyState);
		work.update({ candidateid: candidateid }, {
						$push: {
								workexperience: wsObj.workexperience[0]
						}
				},
				function() {
						workneoprocessor.DesignationRelationBuilder(wsObj.workexperience[0].designation,
						wsObj.workexperience[0].workplace, wsObj.workexperience[0].Location, candidateid,
						function(err, result) {

										if (result) {
												sucessCB();
										}

								});
						sucessCB();
						console.log("====added the workexperience=====>???????");
				}
		);
}

// , errorCB
function updateworkexp(wsobj, candidateid, workplace, sucessCB) {
		work.update({ candidateid: candidateid, 'workexperience.workplace': workplace }, {
						$set: {
								'workexperience.$.designation': wsobj.workexperience[0].designation,
								'workexperience.$.workplace': wsobj.workexperience[0].workplace,
								'workexperience.$.Location': wsobj.workexperience[0].Location,
								'workexperience.$.duration.from': wsobj.workexperience[0].duration.from,
								'workexperience.$.duration.to': wsobj.workexperience[0].duration.to,
								'workexperience.$.duration.duration': wsobj.workexperience[0].duration.duration,
								'workexperience.$.skills': wsobj.workexperience[0].skills
						}
				},
				function() {
						sucessCB('workexperience updated');
						console.log("updating answers which are answered by the user");
				}

		);
}

//deleteworkexp deletes from MONGODB and calls delete function for NEO
function deleteworkexp(candidateid, designation, sucessCB,errorCB) {

	if (mongoose.connection.readyState == 1) {
		// statement
		work.update({
		candidateid: candidateid,
		'workexperience.designation': designation
	}, {
		$pull: {
			workexperience: {
				designation: designation
			}
		}
	}, function() {
						workneoprocessor.workexpRelationDelete(designation,candidateid,function(err, result) {

										if (result) {
												sucessCB();
										}

								});
						sucessCB();
				}
	);//end update
		
	} else {
		// statement
		errorCB(err);
	}

	

}//end deleteworkexp



//add work exp after  entering into the question box into the existing records
function addMissingWorkFieldResponse(candidateid, workInstanceName, fieldname, response, successCB, errorCB) {
	 // console.log("------->"+skillInstanceName+"   "+fieldname+"  "+response);
		console.log("entered in to answers updating mode");
		let field = ('workexperience.$.' + fieldname);
		let setObj = {};
		setObj[field] = response;

		work.update({
						candidateid: candidateid,
						'workexperience.designation': workInstanceName
				}, {
						$set: setObj
				},
				function(err, result) {
						if (err) {}
						successCB(result)
				console.log("===========addMissingWorkFieldResponse=====>");	
				console.log("------>result for workexperience--->"+result);
				}

		);
}
module.exports = {
		getworkexp: getworkexp,
		createworkexp: createworkexp,
		addworkexp: addworkexp,
		updateworkexp: updateworkexp,
		deleteworkexp: deleteworkexp,
		addMissingWorkFieldResponse: addMissingWorkFieldResponse
};

