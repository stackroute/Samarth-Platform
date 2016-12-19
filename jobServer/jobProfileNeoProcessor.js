let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();



createJobNode = function(job, res) {
    let query = "";
    query += 'MERGE (jb: Job{name:{jobCode}}) ';
    query += 'MERGE (jp: JobProvider{name:{jpCode}}) ';
    query += 'MERGE (lc: Location{name:{location}}) '; 
    query += 'MERGE (rl: Role{name:{role}}) ';
    query += 'MERGE (jb)-[r1:Providedby]->(jp)';
    query += 'MERGE (jb)-[r2:Available_At]->(lc) ';
    query += 'MERGE (jb)-[r3:Role_As]->(rl) ';
    query += 'FOREACH (skillname in {skills} | MERGE (sk: Skills{name:skillname.name}) ';
    query += 'MERGE (jb)-[r4:Required{priority:skillname.priority}]->(sk) ) ';
    query += 'FOREACH (qualname in {quals} | MERGE (ql: Qualification{name:qualname.name}) ';
    query += 'MERGE (jb)-[r5:Expected{score:qualname.score,priority:qualname.priority}]->(ql))'; 

    let params = {
        jobCode: jobCode,
        jpCode: job.jpCode,
        location: job.desc.location,
        role: job.desc.role,
        language:job.desc.language,
        quals: job.criteria.qualifications,
        skills: job.desc.skills
    };

    console.log("Query for job profile indexing: ", query, " : ", params);

    db.cypher({
        query: query,
        params: params
    },
     function(err, results) {
        if (err) {
            console.log('Error in inserting relation in neo4j' + err);
        } else {
            console.log('Success in inserting neo4j....' + results);
        }
    });
};

getJobs = function(resArr, successres, errRes) {
    console.log(resArr);
    db.cypher({
            query: 'match(j:Job)-[r]-(n) where n.name in {keys} match (j)-[]-(p:circle) return j.name , count(r) as hits Order by hits desc',
            params: {
                keys: resArr
            }
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }else{
                console.log("in success neo");
            successres(results);
          }
        });
};




module.exports = {
    createJobNode: createJobNode,
    getJobs: getJobs
};
