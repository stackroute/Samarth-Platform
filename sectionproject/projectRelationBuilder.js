let neo4j = require('neo4j');   
var neo4jConnection = require("../connections/neo4jconnection.js");
  
let db = neo4jConnection.getConnection();
   // ,duration:{duration}
let projectRelationBuilder = function(candidateid, projectName,location,skills,income,duration,errCB) {
  
    db.cypher({
     query:'MERGE(c:Candidate{name:{candidateid}})MERGE(p:Work{name:{typeOfWork},'+
     'location:{location},skills:{skills},income:{income}})MERGE(c)-[r:Worked_on]->(p)',
        params: {
            candidateid: candidateid,
            typeOfWork: projectName,
            location: location,
            skills: skills,
            income: income
            // duration: duration

        }
    }, function(err, results) {
        if (err){
            errCB(err, null);
        }
         else {
            // errCB(null, results);
        }
    } 
    );
};

module.exports = {
    projectRelationBuilder: projectRelationBuilder
};
