let async = require('async');
// let redis = require("redis");
// let client = redis.createClient();
// let candidateProcessor = require('./candidate/candidateprocessor');
// let importprocessor = require('./import/importprocessor');
let neo4jConnection = require("./connections/neo4jconnection");
let mongoose = require('mongoose');
let db = neo4jConnection.getConnection();
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

let candidateProcessor = require('./candidate/candidateprocessor');
let skillImportProcessor = require('./import/skillprocessor');
let workexpImportProcessor = require('./import/workexpProcessor');
let qualificationImportProcessor = require('./import/qualificationProcessor');
let projectsImportProcessor = require('./import/projectsProcessor');
let preferencesImportProcessor = require('./import/preferencesProcessor');

//function candidateProfileImport(){
// client.brpop("profileImport", 0, function(err, uploadedId) {
          
//           console.log(' brpop: ' + uploadedId[1]);
//           try {
//           	importprocessor.getDataById(uploadedId[1], 
//           		function(resData) {
//           			console.log(resData[0].data);
//           			let obj = resData[0].data;
//    for (var i = obj.length - 1; i >= 0; i--) {
             //     candidateProcessor.candidateProfileProcessor(obj[i],
                    //   function(result) {
                    //       console.log("Result  ", result);
                    //       // res.json(result);
                  // },
                  // function(err) {
                  //     // return res.status(500).json({ error: err });
                  // });
            //    };
//              },
//              function(err) {
//                  console.log(err);
//            });
            

//    } catch (err) {
//         console.log("error", err);
//     }
//           setTimeout(candidateProfileImport, 1000);
// });
// }
// candidateProfileImport();

let candidate = [{
    "name": "Aashina",
    "email": "jarvisfreeman@boilicon.com",
    "pwd": "Password@123",
    "mobile": "8053777732",
    "location": " Kimmell",
    "placementCenter":" Delhi" ,
    "aadharcard": 134710772211,
    "profession": "Civil Avitation",
    "dob": "2012-05-07 ",
    "gender": "male",
    "maritialstatus": "Married",
    "centerCode": 91643,
    "skills": [
      {
        "skillname": "HTML",
        "expertise": "Skilled",
        "experience": 1,
        "metadata": {}
      }
    ]
}]

// let candidate = {
//   name: 'Durgesh',
//   skills : [{name : "angular"},{name : "React"} ],
//   work : [{company : "wipro"},{company : "ibm"} ],
//   education : [{title : "BE"},{title : "ME"} ],
//   projects : [{name : "Samarth"},{name : "Oxygen"} ],
//   preferences : [{looking_jobs : "Yes"}]
// }
function reg(candidate){
  let promise = new Promise(function(resolve, reject){
    console.log('Registering candidate', candidate.name);
    candidateProcessor.candidateProfileProcessor(candidate,
                      function(result) {
                          console.log("Result  ", result);
                          
                  },
                  function(err) {
                      console.log("error  ", err);
                  });
    resolve(candidate);
  });
  return promise;
}
function asyncParallelProfile(candidate, callback){
   async.parallel({
    skills: function(callback) {
       console.log("candidate skills");
       skillImportProcessor.skillAsyncParallel(candidate, callback);
    }
    //,
    //  work: function(callback) {
    //    console.log("candidate work");
    //    workexpImportProcessor.workAsyncParallel(candidate)
    //         callback(null, {work: 'candidate work'});
    // },
    // education: function(callback) {
    //    console.log("candidate education");
    //    qualificationImportProcessor.educationAsyncParallel(candidate)
    //         callback(null, {education: 'candidate education'});
    // },
    // projects: function(callback) {
    //    console.log("candidate projects");
    //    projectsImportProcessor.projectsAsyncParallel(candidate)
    //         callback(null, {projects: 'candidate projects'});
    // },
    // preferences: function(callback) {
    //    console.log("candidate preferences");
    //    preferencesImportProcessor.preferencesAsyncParallel(candidate)
    //         callback(null, {preferences: 'candidate preferences'});
    // }
   }, 
   function(err, results) {
    callback(err, results);
  });
}
function profileImport(candidate){
  async.waterfall([function(callback){
    //the callback passed is from async waterfall
    reg(candidate).then(function(success){
      callback(null, success)
    }, function(err){
      callback(err, null);
    });    
  }, function(result, callback){    
    //the callback passed is from async waterfall
    asyncParallelProfile(candidate, callback);
  }], function(Err, importResults){
    
    if(Err) {
      console.log("Error in importing: ", Err);
      return;
    } 
    console.log("Final import results: ", importResults);
    return;
  });
}
  
profileImport(candidate[0]);

