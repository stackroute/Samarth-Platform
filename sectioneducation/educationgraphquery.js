let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let relationConfig = require("../relationConfig/relationconfig");
let db = neo4jConnection.neo4jconnection.getConnection();




qualification_institute = function(institute, candidateid,institutename, successCB) {
    

    db.cypher({
    query: 'MERGE(c:Candidate{name:{candidateid}}) MERGE(p:Qualification{name:{institute},nameofins:{institutename}}) MERGE(i:Institute{name:{institutename}}) MERGE (c)-[r:'+relationConfig.neorelationconfig()['Qualification_in']+']->(p) MERGE (c)-[f:'+relationConfig.neorelationconfig()['Qualified_from']+']->(i)',
        params: {
            candidateid: candidateid,
            institute: institute ,
            institutename:institutename
        }
    }, function(err, results) {
        if (err) {
            successCB(err,null);
        } else {

            successCB(null,results);
        }
    });
};

module.exports = {
    qualification_institute: qualification_institute
};
