let neo4j = require('neo4j');
let neo4jConnection = require("../connections/neo4jconnection.js");
let relationConfig = require("../relationConfig/relationconfig");

console.log(relationConfig.neorelationconfig()['IS_A']);

let db = neo4jConnection.getConnection();


let DesignationRelationBuilder = function(designation, candidateid, errCB) {
    //console.log("*****************from skillRelationBuilder",candidateid);
    //console.log("*****************from skillRelationBuilder",skill);


    db.cypher({
     query:'MERGE(c:Candidate{name:{candidateid}})MERGE(rl:Role{name:{designation}})MERGE(c)-[r:'+relationConfig.neorelationconfig()['IS_A']+']->(rl)',
        params: {
            candidateid: candidateid,
            designation: designation
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
    DesignationRelationBuilder: DesignationRelationBuilder
};
