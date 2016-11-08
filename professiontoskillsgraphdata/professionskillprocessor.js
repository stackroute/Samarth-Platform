let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


createprofessiontoskill = function(profession, skills, roles, success, error) {
   // console.log(skills);
    db.cypher({
        query: 'MERGE (p:Profession {name:{profession}})' +
            ' FOREACH (skillName in {skills} |  MERGE (s:Skill {name:skillName}) ' +
            ' MERGE (p)-[r1:PRIMARY]->(s)  MERGE (s)-[r2:USEDIN]->(p)) ' +
            'FOREACH (roleName in {roles} |  MERGE (ro:Role {name:roleName})  MERGE (p)-[r3:HASDESIGNATION]->(ro)) ' +
            'MERGE (c:circle {name:{profession},domain:{domain}})  MERGE (p)-[r4:HASCIRCLE]->(c)',

        params: {
            profession: profession,
            skills: skills,
            roles: roles,
            domain: 'profession'

        }
    }, function(err, results) {
        if (err) {
            error(err);
        } else {
            success(results);
        }
    });
};

module.exports = {
    createprofessiontoskill: createprofessiontoskill
};
