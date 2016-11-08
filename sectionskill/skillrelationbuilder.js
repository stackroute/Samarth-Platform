var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


skillRelationBuilder = function(skill, candidateid, errCB) {
    //console.log("*****************from skillRelationBuilder",candidateid);
    //console.log("*****************from skillRelationBuilder",skill);

    db.cypher({
        query: 'MERGE (c:Candidate{name:{candidateid}}) MERGE(sk:Skill{name:{skillname}}) MERGE (c)-[r:KNOWS]->(sk)',
        params: {
            candidateid: candidateid,
            skillname: skill
        }
    }, function(err, results) {
        if (err) {
            //console.log(err);
            errCB(err, null);
        } else {
            //console.log("Vetri..Vetri...",results);
            errCB(null, results);
        }
    });
}

module.exports = {
    skillRelationBuilder: skillRelationBuilder
}
