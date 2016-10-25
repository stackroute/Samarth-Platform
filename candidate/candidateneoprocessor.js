var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:akanksha@localhost:7474');


createCandidate = function(req, res) {
    db.cypher({
        query: 'MERGE (c:Candidate{name:{candidateid}}) MERGE (l:Location{name:{location}}) MERGE (pr:Profession{name:{profession}}) MERGE (c)-[r:belongs_to]->(l) MERGE (c)-[rel:working_as]->(pr)',
        params: {
            candidateid: req.mobile,
            location: req.location,
            profession: req.profession
        }
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Success....", results);
        }
    });
}

module.exports = {
    createCandidate: createCandidate
}
