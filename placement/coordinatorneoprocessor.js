let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();

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

getRole = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Role) RETURN p.name as role'
    }, function(err, role) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(role);
        }
    });
};

getLanguage = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Language) RETURN p.name as language'
    }, function(err, language) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(language);
        }
    });
};

getLocation = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Location) RETURN p.name as location'
    }, function(err, location) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(location);
        }
    });
};

module.exports = {
    getLocation: getLocation,
    getLanguage: getLanguage,
    getRole: getRole,
    getProfessions: getProfessions
}