let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();

// 'MATCH (n:coordinator{username:{username}})-[r]->(c:circle)-[rel]-() RETURN c, count(rel)'
getCircles = function(entityname, successres, errRes) {
    // console.log(entityname)
    db.cypher({
            // query: 'MATCH (n:coordinator{username:{entityname}})-[r]->(c:circle) RETURN c.name as name,c.domain as domain,count(r) as rCount',
            // query: 'MATCH (n:coordinator{username:"manisha@gmail.com"})-[r]-(c:circle) match (p:Profession {name:c.name}) match (p)-[rc]-(:Candidate) return c.name as name, c.domain as domain, count(rc) as rCount',
            query: 'MATCH (n:coordinator{username:{entityname}})-[r]-(c:circle) match (p:Profession {name:c.name}) match (p)-[rc]-(cd:Candidate) return c.name as name, labels(cd)[0] as domain, count(rc) as rCount',
            params: {
                entityname: entityname
            }
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }else{


            successres(results);
            // console.log("results"+results[0].name);
            // console.log("results"+results[1].name);
            // console.log("results"+results[2].rCount);
          }
        });
};

creacteNode = function(req, errRes,res) {
  console.log("in create node "+req.name);
    db.cypher({
            query: 'merge (n:circle{name: {name},domain:{domain}})',
            params: {
                ename: req.name,
                domain: req.domain
            }
        },
        function(err, results) {
            if (err) {

                errRes(results);
            }
        });
};

createRelation = function(req, res) {
    db.cypher({

      query:'merge (n:coordinator{username:{username}}) FOREACH (prof in {profs} | merge (c:circle{name:prof}) merge (n)-[r:have_profession]->(c)) FOREACH (lang in {langs} | merge (lg:Language{name:lang.name}) merge (n) -[rt: knows{speak: lang.speak, read: lang.read, write: lang.write}]-> (lg))',
            // query += 'merge (n:coordinator{username:{username}}) ';
            // query +='FOREACH (prof in name | merge(c:circle{name:prof}) merge (n)-[r:have_profession]->(c))';
            //  merge (c:circle{domain:{profession},name:{name}}) merge (n)-[r:primaryOwner ]->(c)
            //  FOREACH (skillname in {skills} | MERGE (sk: Skills{name:skillname.name})
            params: {
                username: req.email,
                profs: req.profession,
                langs: req.language
                // profession: reqprofession;
            }
        },
        function(err, results) {
            if (err) {
                res(err);
            }
            res(results);
        });
};
module.exports = {
    creacteNode: creacteNode,
    createRelation: createRelation,
    getCircles: getCircles
};
