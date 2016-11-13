let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.neo4jconnection.getConnection();

// 'MATCH (n:coordinator{username:{username}})-[r]->(c:circle)-[rel]-() RETURN c, count(rel)'
getCircles = function(entityname, successres, errRes) {
    // console.log(entityname)
    db.cypher({
            // query: 'MATCH (n:coordinator{username:{entityname}})-[r]->(c:circle) RETURN c.name as name,c.domain as domain,count(r) as rCount',
            // query: 'MATCH (n:coordinator{username:"manisha@gmail.com"})-[r]-(c:circle) match (p:Profession {name:c.name}) match (p)-[rc]-(:Candidate) return c.name as name, c.domain as domain, count(rc) as rCount',
            query: 'MATCH (n:coordinator{username:"manisha@gmail.com"})-[r]-(c:circle) match (p:Profession {name:c.name}) match (p)-[rc]-(cd:Candidate) return c.name as name, labels(cd)[0] as domain, count(rc) as rCount',
            params: {
                entityname: entityname
            }
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }
            successres(results);
        });
};

creacteNode = function(req, errRes) {
    db.cypher({
            query: 'merge (n:circle{name: {name},domain:{domain}})',
            params: {
                name: req.name,
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
            query: 'merge (n:coordinator{username:{username}}) merge (c:circle{domain:{profession},name:{name}}) merge (n)-[r:primaryOwner ]->(c)',
            params: {
                username: req.email,
                name: req.profession,
                profession: 'profession'
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
