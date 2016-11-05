let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


createCandidate = function(req, successCB, errorCB) {
    console.log('*********************************************', req);
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
            errorCB && errorCB(err);
        } else {
            successCB();
            // console.log("Success....",results);
        }
    });
};

// createCandidate = function(req, res) {
//     db.cypher({
//         query: 'MERGE (c:Candidate{name:{candidateid}}) MERGE (l:Location{name:{location}}) MERGE (pr:Profession{name:{profession}}) MERGE (c)-[r:belongs_to]->(l) MERGE (c)-[rel:working_as]->(pr)',
//         params: {
//             candidateid: req.mobile,
//             location: req.location,
//             profession: req.profession
//         }
//     }, function(err, results) {
//         if (err) {
//             console.log(err);
//         } else {
//             //console.log("Success....",results);
//         }
//     });

// }

getcircle = function(circle, successCB, errorCB) {
    console.log('from circle neo', circle);

    db.cypher({
        query: 'MATCH (c:Candidate),(p:Profession{name:{circlename}}) WHERE (c)-[:working_as]->(p) RETURN c.name as candidateid',
        params: {
            circlename: circle
        }
    }, function(err, results) {
        if (err) {
            console.log('Circle', err);
        } else {
            console.log('from circle neo', results);
            successCB(results);
        }
    });
};


getProfessions = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Profession) RETURN p.name as professions'
    }, function(err, professions) {
        if (err) {
            console.log(err);
            errCB(err);
        } else {
            console.log(professions);
            successCB(professions);
        }
    });
};


parseskill = function(req, successCB, errorCB) {
    console.log('working in search', req);

    db.cypher({
        query: 'MATCH (s:Skill) WHERE s.name IN {searchtext} RETURN s.name as skill;',
        params: {
            searchtext: req
        }
    }, function(err, found) {
        if (err) {
            console.log(err);
            errorCB(err);
        } else {
            console.log(found[0]);
            successCB(found[0]);
        }
    });
};

searchquery = function(req, successCB, errorCB) {
    if (req.profession == null && req.location == null && req.skill == null) {
        let result = [];
        successCB(result);
    }

    // finds all the
    if (req.profession != null && req.location != null && req.skill != null) {
        console.log('I found you in query1');
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
                console.log('From query1', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    } else if (req.profession != null && req.location != null && req.skill ==
        null) {
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
                console.log('from query2', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    } else if (req.profession != null && req.location == null && req.skill !=
        null) {
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
                console.log('from query3', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    } else if (req.profession == null && req.location != null && req.skill !=
        null) {
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
                console.log('from quert4', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }


    // returns all the candidates with  a profession
    else if (req.profession != null && req.location == null && req.skill ==
        null) {
        db.cypher({
            query: 'MATCH (c:Candidate),(p:Profession) WHERE (c)-[:working_as]->(p) AND p.name={profession} RETURN c.name as candidateid;',
            params: {
                profession: req.profession.profession

            }
        }, function(err, results) {
            if (err) {
                console.log('from query5', err);
                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
    // returns all the candidates with a location
    else if (req.location != null && req.profession == null && req.skill ==
        null) {
        db.cypher({
            query: 'MATCH (c:Candidate),(l:Location) WHERE (c)-[:belongs_to]->(l) AND l.name={location} RETURN c.name as candidateid;',
            params: {
                location: req.location.location

            }
        }, function(err, results) {
            if (err) {
                console.log('from query6', err);

                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
    // returns all candidates with a skill.
    else if (req.skill != null && req.profession == null && req.location ==
        null) {
        db.cypher({
            query: 'MATCH (c:Candidate),(s:Skill) WHERE (c)-[:KNOWS]->(s) AND s.name={skill} RETURN c.name as candidateid;',
            params: {
                skill: req.skill.skill

            }
        }, function(err, results) {
            if (err) {
                console.log('from query7', err);

                errorCB(err);
            } else {
                successCB(results);
            }
        });
    }
};


parseprofession = function(req, successCB, errorCB) {
    db.cypher({
        query: 'MATCH (p:Profession) WHERE p.name IN {searchtext} RETURN p.name as profession;',
        params: {
            searchtext: req
        }
    }, function(err, found) {
        if (err) {
            console.log(err);
            errorCB(err);
        } else {
            console.log(found[0]);
            successCB(found[0]);
        }
    });
};

parselocation = function(req, successCB, errorCB) {
    db.cypher({
        query: 'MATCH (l:Location) WHERE l.name IN {searchtext} RETURN l.name as location;',
        params: {
            searchtext: req
        }
    }, function(err, found) {
        if (err) {
            console.log(err);
            errorCB(err);
        } else {
            console.log(found[0]);
            successCB(found[0]);
        }
    });
};

// parseskill = function(req, successCB, errorCB) {


//     db.cypher({
//         query: 'MATCH (s:Skills) WHERE s.skill_name IN {searchtext} RETURN s.skill_name as skill;',
//         params: {
//             searchtext: req
//         }
//     }, function(err, found) {
//         if (err) {
//             console.log(err);
//             errorCB(err);
//         } else {
//             console.log(found[0]);
//             successCB(found[0]);
//         }
//     });

// }


// searchquery = function(req, successCB, errorCB) {

//     //finds all the
//     if (req.profession != "" && req.location != null && req.skill != null) {
//         console.log("I found you in query1");
//         var query1 = 'MATCH (c:Candidate),(p:Profession),(l:Location),(s:Skills) WHERE ' +
//             '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
//             '(c)-[:belongs_to]->(l) AND l.name={location} AND ' +
//             '(c)-[:KNOWS]->(s) AND ' +
//             's.skill_name={skill} RETURN c.name as candidates;';

//         db.cypher({
//             query: query1,
//             params: {
//                 profession: req.profession.profession,
//                 location: req.location.location,
//                 skill: req.skill.skill
//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("From query1", err);
//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     } else if (req.profession != null && req.location != null && req.skill == null) {

//         var query2 = 'MATCH (c:Candidate),(p:Profession),(l:Location) WHERE ' +
//             '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
//             '(c)-[:belongs_to]->(l) AND l.name={location}  ' +
//             'RETURN c.name as candidates;';


//         db.cypher({
//             query: query2,
//             params: {
//                 profession: req.profession.profession,
//                 location: req.location.location
//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from query2", err);
//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     } else if (req.profession != null && req.location == null && req.skill != null) {

//         var query3 = 'MATCH (c:Candidate),(p:Profession),(s:Skills) WHERE ' +
//             '(c)-[:working_as]->(p) AND p.name={profession} AND ' +
//             '(c)-[:KNOWS]->(s)  AND' +
//             's.skill_name={skill} RETURN c.name as candidates;';


//         db.cypher({
//             query: query3,
//             params: {
//                 profession: req.profession.profession,
//                 skillname: req.skill.skill
//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from query3", err);
//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     } else if (req.profession == null && req.location != null && req.skill != null) {

//         var query4 = 'MATCH (c:Candidate),(l:Location),(s:Skills) WHERE ' +
//             '(c)-[:belongs_to]->(l) AND l.name={location} AND ' +
//             '(c)-[:KNOWS]->(s) AND ' +
//             's.skill_name={skill} RETURN c.name as candidates;';

//         db.cypher({
//             query: query4,
//             params: {
//                 location: req.location.location,
//                 skillname: req.skill.skill
//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from quert4", err);
//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     }


//     //returns all the candidates with  a profession
//     else if (req.profession != "" && req.location == null && req.skill == null) {
//         db.cypher({
//             query: 'MATCH (c:Candidate),(p:Profession) WHERE (c)-[:working_as]->(p) AND p.name={profession} RETURN c.name as candidates;',
//             params: {
//                 profession: req.profession.profession

//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from query5", err);
//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     }
//     //returns all the candidates with a location
//     else if (req.location != "" && req.profession == null && req.skill == null) {
//         db.cypher({
//             query: 'MATCH (c:Candidate),(l:Location) WHERE (c)-[:belongs_to]->(l) AND l.name={location} RETURN c.name as candidates;',
//             params: {
//                 location: req.location.location

//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from query6", err);

//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     }
//     // returns all candidates with a skill.
//     else if (req.skill != null && req.profession == null && req.location == null) {
//         db.cypher({
//             query: 'MATCH (c:Candidate),(s:Skills) WHERE (c)-[r:KNOWS]->(s) AND s.skill_name={skill} RETURN c.name as candidates;',
//             params: {
//                 skill: req.skill.skill

//             }
//         }, function(err, results) {
//             if (err) {
//                 console.log("from query7", err);

//                 errorCB(err);
//             } else {
//                 successCB(results);
//             }
//         });
//     }

// }


module.exports = {

    createCandidate: createCandidate,
    parseprofession: parseprofession,
    parselocation: parselocation,
    parseskill: parseskill,
    getProfessions: getProfessions,
    searchquery: searchquery,
    getcircle: getcircle
};
