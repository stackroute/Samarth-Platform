let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();



createJobNode = function(job, jobCode, res) {
    console.log("in neo "+jobCode);
    db.cypher({
        // query: 'MERGE (ee: employer{name:{employerName},employerID:{employerID}}) MERGE (jb:job{jobID:{jobID},employerID:{employerID}}) MERGE (l:location{name:{locationName}}) MERGE (rl:role{name:{roleName}}) MERGE (p:profession{name:{professionName}}) MERGE (ee)-[r1:POSTED]->(jb) MERGE (jb)-[r2:LOCATEDAT]->(l) MERGE (jb)-[r3:NEEDAPROFESSION]->(p) MERGE (jb)-[r4:NEEDROLE]->(rl) MERGE (rl)-[r5:HAVINGJOB]->(jb) MERGE (p)-[r6:HAVEJOB]->(jb) FOREACH (skillreq in {skills} | MERGE (s:skill{name:skillreq.skillName}) MERGE (s)-[r7:USEDIN]->(p) MERGE (p)-[r8:PRIMARY]->(s) MERGE (jb)-[r9:NEEDS]->(s) MERGE (s)-[r10:REQUIREDJOB]->(jb))',
        query: 'MERGE (jb: Job{name:{jobcode}}) MERGE (jp: Jobprovider{name:{jpCode}}) MERGE (lc: Location{name:{location}}) MERGE(lg: Language{name:{language}}) MERGE(rl: Role{name:{role}}) MERGE (jb)-[r1:Providedby]->(jp) MERGE (jb)-[r2:Available_At]->(lc) MERGE (jb)-[r3:Role_As]->(rl) FOREACH (skillreq in {skills} | MERGE (sk: JobSkills{name:{skillreq.name}}) MERGE (jb)-[r4:Required]->(sk)) FOREACH (qual in {qualifications} | MERGE (ql: JobQualification{name:{qual.name}}) MERGE (jb)-[r5:Expected]->(ql))', 
        params: {
            jobcode: jobCode,
            jpCode: job.desc.jpCode,
            location: job.desc.location,
            role: job.desc.role,
            qual: job.criteria.qualifications,
            skills: job.desc.skills
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
    createJobNode: createJobNode
};
