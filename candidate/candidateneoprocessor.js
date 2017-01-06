let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();


createCandidate = function(req, successCB, errorCB) {


    try{
        db.cypher({
            query: 'MERGE (c:Candidate{name:{candidateid},username:{username}}) MERGE (l:Location{name:{location}}) MERGE (pr:Profession{name:{profession}}) MERGE (c)-[r:belongs_to]->(l) MERGE (c)-[rel:working_as]->(pr)',
            params: {
                candidateid: req.mobile,
                username: req.name,
                location: req.location,
                profession: req.profession
            }
        }, function(err, results) {

            

            if (err) {
               // errorCB(esrr);
// console.log(err);
                
               // console.log(err);
                errorCB && errorCB(err);

            } else {
                successCB("Success....");//modified by hari(added the result as parameter)
                // console.log("Success....",results);
            }
        });
    }catch(err){
        console.log('inside catch in createneoCandidate -->',err);
    }
};



getcircle = function(circle, successCB, errorCB) {
   // console.log('from circle neo', circle);

    db.cypher({
        query: 'MATCH (c:Candidate),(p:Profession{name:{circlename}}) WHERE (c)-[:working_as]->(p) RETURN c.name as candidateid',
        params: {
            circlename: circle
        }
    }, function(err, results) {
        if (err) {
            console.log('Circle', err);
        } else {
           // console.log('from circle neo', results);
            successCB(results);
        }
    });
};


getProfessions = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Profession) RETURN p.name as professions'
    }, function(err, professions) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(professions);
        }
    });
};


parseskill = function(req, successCB, errorCB) {
    try{

    db.cypher({
        query: 'MATCH (s:Skill) WHERE s.name IN {searchtext} RETURN s.name as skill;',
        params: {
            searchtext: req
        }
    }, function(err, found) {
        if (err) {
          //  console.log(err);
            errorCB(err);
        } else {
           // console.log(found[0]);
            successCB(found[0]);
        }
    });
}catch(err){
    console.log("inside parse skill",err);
}
};

searchquery = function(req, successCB, errorCB) {

    if (req.profession === undefined && req.location === undefined && req.skill === undefined) {
        let result = [];
        successCB(result);
    }

    // finds all the
     if (req.profession !== undefined && req.location !== undefined && req.skill !== undefined) {

        let query1 =
            'MATCH (c:Candidate),(p:Profession),(l:Location),(s:Skill) WHERE ' +

            '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
            '(c)-[:belongs_to]->(l) AND l.name={location} AND ' +
            '(c)-[:KNOWS]->(s) AND ' +
            's.name={skill} RETURN c.name as candidateid;';

        db.cypher({
            query: query1,
            params: {
                profession: req.profession.profession,
                location: req.location.location,
                skill: req.skill.skill
            }
        }, function(err, results) {
            if (err) {
               // console.log('From query1', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });

    } else if (req.profession !== undefined && req.location !== undefined && req.skill ===
        undefined) {

        let query2 = 'MATCH (c:Candidate),(p:Profession),(l:Location) WHERE ' +
            '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
            '(c)-[:belongs_to]->(l) AND l.name={location}  ' +
            'RETURN c.name as candidateid;';


        db.cypher({
            query: query2,
            params: {
                profession: req.profession.profession,
                location: req.location.location
            }
        }, function(err, results) {
            if (err) {
               // console.log('from query2', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });

    } else if (req.profession !== undefined && req.location === undefined && req.skill !==
        undefined) {
        let query3 = 'MATCH (c:Candidate),(p:Profession),(s:Skill) WHERE ' +
            '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
            '(c)-[:KNOWS]->(s)  AND' +
            's.name={skillname} RETURN c.name as candidateid;';


        db.cypher({
            query: query3,
            params: {
                profession: req.profession.profession,
                skillname: req.skill.skill
            }
        }, function(err, results) {
            if (err) {
               // console.log('from query3', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });

    } else if (req.profession === undefined && req.location !== undefined && req.skill !==
        undefined) {

        let query4 = 'MATCH (c:Candidate),(l:Location),(s:Skill) WHERE ' +
            '(c)-[:belongs_to]->(l) AND l.name={location} AND ' +
            '(c)-[:KNOWS]->(s) AND ' +
            's.name={skillname} RETURN c.name as candidateid;';

        db.cypher({
            query: query4,
            params: {
                location: req.location.location,
                skillname: req.skill.skill
            }
        }, function(err, results) {
            if (err) {
               // console.log('from quert4', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }


    // returns all the candidates with  a profession
    else if (req.profession !== undefined && req.location === undefined && req.skill ===
        undefined) {
        db.cypher({
            query: 'MATCH (c:Candidate),(p:Profession) WHERE (c)-[:working_as]->(p) AND p.name={profession} RETURN c.name as candidateid;',
            params: {
                profession: req.profession.profession

            }
        }, function(err, results) {
            if (err) {
               // console.log('from query5', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
    // returns all the candidates with a location
    else if (req.location !== undefined && req.profession === undefined && req.skill ===
        undefined) {
        db.cypher({
            query: 'MATCH (c:Candidate),(l:Location) WHERE (c)-[:belongs_to]->(l) AND l.name={location} RETURN c.name as candidateid;',
            params: {
                location: req.location.location

            }
        }, function(err, results) {
            if (err) {

                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
    // returns all candidates with a skill.
    else if (req.skill !== undefined && req.profession === undefined && req.location ===
        undefined) {
        db.cypher({
            query: 'MATCH (c:Candidate),(s:Skill) WHERE (c)-[:KNOWS]->(s) AND s.name={skill} RETURN c.name as candidateid;',
            params: {
                skill: req.skill.skill

            }
        }, function(err, results) {
            if (err) {
            
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
};


parseprofession = function(req, successCB, errorCB) {
try{
    db.cypher({
        query: 'MATCH (p:Profession) WHERE p.name IN {searchtext} RETURN p.name as profession;',
        params: {
            searchtext: req
        }
    }, function(err, found) {

        console.log('professsion -->',found);
        console.log('profession not found --->',err);

        if (err) {
           // console.log(err);
            errorCB(err);
        } else {
           // console.log(found[0]);
            successCB(found[0]);
        }
    });
}catch(err){
    console.log("inside parse profession error",err);
}
};

parselocation = function(req, successCB, errorCB) {
    try{
    db.cypher({
        query: 'MATCH (l:Location),(d:Dictionary) WHERE l.name IN d.'+req+' RETURN l.name as location',
       
    }, function(err, found) {
        if (err) {
           // console.log(err);
            errorCB(err);
        } else {
          //  console.log(found[0]);
            successCB(found[0]);
        }
    });
}
catch(err){
    console.log("inside parse location",err);
}
};

getAllCandidate = function(req,successCB,errorCB)
{
    try
    {
        db.cypher({
            query:'MATCH (n:Candidate) RETURN n.name as name limit 2'
        },function(err,found){
            if(err)
            {
                errorCB(err);
            }
            else
            {
                successCB(found);
            }
        })
    }
    catch(err){

    }
};


module.exports = {

    createCandidate: createCandidate,
    parseprofession: parseprofession,
    parselocation: parselocation,
    parseskill: parseskill,
    getProfessions: getProfessions,
    searchquery: searchquery,
    getcircle: getcircle,
    getAllCandidate:getAllCandidate
};