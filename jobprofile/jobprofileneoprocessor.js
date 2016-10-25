var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:Govindam@123@localhost:7474');


createEmployerNode = function(job, res) {
    db.cypher({
        query: 'MERGE (ee: Employer{employerID:{employerID}}) MERGE (jb:Job{jobID:{jobID}}) MERGE (ee)-[r:posted]->(jb)',
        params: {
            employerID: job.employer.employerID,
            jobID: job.jobID
        }
    }, function(err, results) {
        if (err) {
            console.log("Error in inserting relation in neo4j" + err);
        } else {
            console.log("Success in inserting neo4j...." + results);
        }
    });
}

module.exports = {
    createEmployerNode: createEmployerNode
}
