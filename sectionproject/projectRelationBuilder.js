let neo4j = require('neo4j');   
var neo4jConnection = require("../connections/neo4jconnection.js");
  
let db = neo4jConnection.getConnection();
   // ,duration:{duration}
let projectRelationBuilder = function(candidateid, name,durationInMonths,location,skills,client,role,errCB) {
  
    db.cypher({
     query:'MERGE(c:Candidate{name:{candidateid}})MERGE(p:Work{name:{typeOfWork},'+
     'location:{location},skills:{skills},role:{role}})MERGE(c)-[r:Worked_on]->(p)',
        params: {
            candidateid: candidateid,
            typeOfWork: name,
            location: location,
            skills: skills,
            role: role
            // duration: duration

        }
    }, function(err, results) {
        if (err){
            errCB(err, null);
        }
         else {
            errCB(null, results);
        }
    } 
    );
};

module.exports = {
    projectRelationBuilder: projectRelationBuilder
};
