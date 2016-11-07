let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


createEmployerNode = function(job, res) {
    db.cypher({
        query: 'MERGE (ee: employer{name:{employerName},employerID:{employerID}}) MERGE (jb:job{jobID:{jobID},employerID:{employerID}}) MERGE (l:location{name:{locationName}}) MERGE (rl:role{name:{roleName}}) MERGE (p:profession{name:{professionName}}) MERGE (ee)-[r1:POSTED]->(jb) MERGE (jb)-[r2:LOCATEDAT]->(l) MERGE (jb)-[r3:NEEDAPROFESSION]->(p) MERGE (jb)-[r4:NEEDROLE]->(rl) MERGE (rl)-[r5:HAVINGJOB]->(jb) MERGE (p)-[r6:HAVEJOB]->(jb) FOREACH (skillreq in {skills} | MERGE (s:skill{name:skillreq.skillName}) MERGE (s)-[r7:USEDIN]->(p) MERGE (p)-[r8:PRIMARY]->(s) MERGE (jb)-[r9:NEEDS]->(s) MERGE (s)-[r10:REQUIREDJOB]->(jb))',
        params: {
            employerName: job.employer.employerName,
            employerID: job.employer.employerID,
            jobID: job.jobID,
            locationName: job.jobLocation,
            roleName: job.jobRole,
            professionName: job.jobProfession,
            skills: job.skillsRequired
        }
    }, function(err, results) {
        if (err) {
            console.log('Error in inserting relation in neo4j' + err);
        } else {
            console.log('Success in inserting neo4j....' + results);
        }
    });
};


module.exports = {
    createEmployerNode: createEmployerNode
};
