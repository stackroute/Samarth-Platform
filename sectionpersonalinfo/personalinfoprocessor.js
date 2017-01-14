let mongoose = require('mongoose');
// var personalSchema=require('./personschema');
let person = require('./personalinfoschema');

function createNewpersonalinfo(formobj, successCB, errorCB) {
    let personObj = new person({
        candidateid: formobj.mobile,
        name: formobj.name,
        dob: null,
        email: formobj.email,
        contact: formobj.mobile,
        gender: '',
        mothertongue: '',
        maritialstatus: '',
        address: '',
        location: formobj.location,
        pincode: null

    });
    personObj.save(function(err, postdetails) {
        if (err) {
            errorCB(err);
        }
        successCB(postdetails);
    });
} 

function getPersonalinfo(candidateid, successCB, errorCB) {
    person.find({ candidateid: candidateid }, function(err, getpersons) {
        if (err) {
            errorCB(err);
        }
        console.log('getpersons data');
        console.log(getpersons);
        successCB(getpersons);
    });
}

function updatePersonalinfo(piObj, candidateId, successCB, errCB) {
    person.update({ candidateid: candidateId }, piObj.personalInfo,

        function(err, result) {
            successCB(result);
        }
    );
}

function updateProfilePic(picObj, candidateId, successCB, errCB) {

    person.find({ candidateid: candidateId }, function(err, getpersons) {
        if (err) {
            errorCB(err);
        }


        getpersons[0].profilepic = picObj.profilepicUrl ;

        person.update({ candidateid: candidateId }, getpersons[0],
            function(err, result) {
                if (err) {
                    errorCB(err);
                }
                successCB(result);
            }
        );
    });
}

function getProfilePic(candidateid, successCB, errorCB) {
    person.find({ candidateid: candidateid }, function(err, getpersons) {
        if (err) {
            errorCB(err);
        }

        console.log('getpersons -++-->',getpersons)
        if(getpersons.length >0 ){
            successCB(getpersons[0].profilepic);
        }else{
            errorCB("No records found");
        }
    }); 
}
 

//add personal info after entering into the question box into the existing records
function addMissingPersonalInfoFieldResponse(candidateid, instancename, fieldname, response, successCB, errorCB) {
   // console.log("------->"+educationInstanceName+"   "+fieldname+"  "+response);
    let field =  fieldname;
    let setObj = {};
    setObj[field] = response;

    person.update({
            candidateid: candidateid,
        }, {
            $set: setObj
        },
        function(err, result) {
            if (err) {}
            successCB(result)
        // console.log("------>result for education--->"+result);
        }

    );
}

module.exports = {
    createNewpersonalinfo: createNewpersonalinfo,
    getPersonalinfo: getPersonalinfo,
    updatePersonalinfo: updatePersonalinfo,
    getProfilePic: getProfilePic,
    updateProfilePic:updateProfilePic,
    addMissingPersonalInfoFieldResponse:addMissingPersonalInfoFieldResponse
};

// let mongoose = require('mongoose');
// // var personalSchema=require('./personschema');
// let person = require('./personalinfoschema');

// function createNewpersonalinfo(formobj, successCB, errorCB) {
//     let personObj = new person({
//         candidateid: formobj.mobile,
//         name: formobj.name,
//         adharcard: formobj.adharcard,
//         dob: formobj.dob,
//         email: formobj.email,
//         contact: formobj.mobile,
//         gender: '',
//         mothertongue: '',
//         maritialstatus: '',
//         address: '',
//         location: formobj.location,
//         pincode: ''

//     });
//     personObj.save(function(err, postdetails) {
//         if (err) {
//             errorCB(err);
//         }
//         successCB(postdetails);
//     });
// } 

// function getPersonalinfo(candidateid, successCB, errorCB) {
//     person.find({ candidateid: candidateid }, function(err, getpersons) {
//         if (err) {
//             errorCB(err);
//         }

//         successCB(getpersons);
//     });
// }

// function updatePersonalinfo(piObj, candidateId, successCB, errCB) {
//     person.update({ candidateid: candidateId }, piObj.personalInfo,

//         function(err, result) {
//             successCB(result);
//         }
//     );
// }

// function updateProfilePic(picObj, candidateId, successCB, errCB) {

//     person.find({ candidateid: candidateId }, function(err, getpersons) {
//         if (err) {
//             errorCB(err);
//         }


//         getpersons[0].profilepic = picObj.profilepicUrl ;

//         person.update({ candidateid: candidateId }, getpersons[0],
//             function(err, result) {
//                 if (err) {
//                     errorCB(err);
//                 }
//                 successCB(result);
//             }
//         );
//     });
// }

// function getProfilePic(candidateid, successCB, errorCB) {
//     person.find({ candidateid: candidateid }, function(err, getpersons) {
//         if (err) {
//             errorCB(err);
//         }

//         console.log('getpersons -++-->',getpersons)
//         if(getpersons.length >0 ){
//             successCB(getpersons[0].profilepic);
//         }else{
//             errorCB("No records found");
//         }
//     }); 
// }
 

// //add personal info after entering into the question box into the existing records
// function addMissingPersonalInfoFieldResponse(candidateid, instancename, fieldname, response, successCB, errorCB) {
//    // console.log("------->"+educationInstanceName+"   "+fieldname+"  "+response);
//     let field =  fieldname;
//     let setObj = {};
//     setObj[field] = response;

//     person.update({
//             candidateid: candidateid,
//         }, {
//             $set: setObj
//         },
//         function(err, result) {
//             if (err) {}
//             successCB(result)
//         // console.log("------>result for education--->"+result);
//         }

//     );
// }

// module.exports = {
//     createNewpersonalinfo: createNewpersonalinfo,
//     getPersonalinfo: getPersonalinfo,
//     updatePersonalinfo: updatePersonalinfo,
//     getProfilePic: getProfilePic,
//     updateProfilePic:updateProfilePic,
//     addMissingPersonalInfoFieldResponse:addMissingPersonalInfoFieldResponse
// };

