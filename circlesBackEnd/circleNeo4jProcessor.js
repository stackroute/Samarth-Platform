var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:akanksha@localhost:7474');
//'MATCH (n:coordinator{username:{username}})-[r]->(c:circle)-[rel]-() RETURN c, count(rel)'
getCircles = function(entityname, successres, errRes) {
    // console.log(entityname)
    db.cypher({
            query: 'MATCH (n:coordinator{username:{entityname}})-[r]->(c:circle)-[rel]-() RETURN c.name as name,c.domain as domain, count(rel) as rCount',
            params: {
                entityname: entityname
            }
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }
            //console.log(results);
            successres(results);
        });

}

creacteNode = function(req, errRes) {
    db.cypher({
            query: 'CREATE (n:circle{name: {name},domain:{domain}})',
            params: {
                name: req.name,
                domain: req.domain
            }
        },
        function(err, results) {
            if (err) {
                //  console.log(err);
            }
            errRes(results);
        });

}

createRelation = function(req, res) {
    console.log(req);
    var relation = req.relation;
    //console.log(relation);
    db.cypher({
            query: 'match(n:coordinator{username:{username}}),(c:circle{name:{circleName}}) create (n)-[r:' + relation + ' ]->(c)',
            params: {
                username: req.username,
                circleName: req.circleName,

            }
        },
        function(err, results) {
            if (err) {
                // console.log(err);
            }
            res(results);
        });

}
module.exports = {
    creacteNode: creacteNode,
    createRelation: createRelation,
    getCircles: getCircles
};
