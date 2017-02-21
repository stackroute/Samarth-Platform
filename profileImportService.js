let async = require('async');
let redis = require("redis");
let client = redis.createClient();

let importprocessor = require('./import/importprocessor');
let neo4jConnection = require("./connections/neo4jconnection");
let mongoose = require('mongoose');
let db = neo4jConnection.getConnection();
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

let candidateProfileImporter = require('./profileImport/candidateProfileImporter');

let totalNoOfCandidates = 0, totalNoFailed = 0, totalNoImported =0;
let importedCandidates = [], failedCandidates = [];

function candidateProfileImport(){
client.brpop("profileImport", 0, function(err, uploadedId) {
          
          // console.log(' brpop: ' + uploadedId[1]);
          try {
          	importprocessor.getDataById(uploadedId[1], 
          		function(resData) {
          			// console.log(resData[0].data);
          			let obj = resData[0].data;
                totalNoOfCandidates = obj.length;
                 candidateProfileImporter.importCandidateProfileColln(obj,
                      function(result) {
                        totalNoFailed = result.failedCandidates.length;
                        totalNoImported = result.importedCandidates.length;
                        console.log("Total no. of candidates : ", totalNoOfCandidates);
                        console.log("Total no. of imported candidates : ", totalNoImported);
                        console.log("Total no. of failed candidates : ", totalNoFailed);
                        // console.log("Result  ", result);
                       
                  },
                  function(err) {
                      // return res.status(500).json({ error: err });
                  });
              
             },
             function(err) {
                 console.log(err);
           });
            

   } catch (err) {
        console.log("error", err);
    }
          setTimeout(candidateProfileImport, 1000);
});
}
candidateProfileImport();

