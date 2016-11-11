let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();




qualification_institute = function(institute, candidateid,institutename, successCB, errorCB) {
    

    db.cypher({
        query: 'MERGE(c:Candidate{name:{candidateid}}) MERGE(p:Qualification{name:{institutename}}) MERGE(i:Institute) MERGE (c)-[r:qualification_in]->(p) MERGE (c)-[f:qualified_from]->(i)',
        params: {
            candidateid: candidateid,
            institute: institute ,
            institutename,institutename
        }
    }, function(err, results) {
        if (err) {
            errorCB(err);
        } else {

            successCB(results);
        }
    });
};

module.exports = {
    qualification_institute: qualification_institute
};
