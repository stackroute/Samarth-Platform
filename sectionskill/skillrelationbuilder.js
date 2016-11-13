let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.neo4jconnection.getConnection();
 

let skillRelationBuilder = function(skill, candidateid, errCB) {
    //console.log("*****************from skillRelationBuilder",candidateid);
    //console.log("*****************from skillRelationBuilder",skill);
 
  
    db.cypher({
     query:'MERGE(c:Candidate{name:{candidateid}})MERGE(sk:Skill{name:{skillname}})MERGE(c)-[r:KNOWS]->(sk)',
        params: {
            candidateid: candidateid,
            skillname: skill
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
    skillRelationBuilder: skillRelationBuilder
};
