let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


let skillRelationBuilder = function(skill, candidateid, errCB) {

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
