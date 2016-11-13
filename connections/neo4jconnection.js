let connConfig = require('./../connConfig')();
let neo4j = require('neo4j');
let neo4jDriver = require('neo4j-driver').v1;

let neo4jconnection = (function() {
    let dbconn;

    function connectToDB() {
        console.log("**** Creating a new Graph DB Connection ****");
        let db = new neo4j.GraphDatabase(connConfig.neoconn);
        return db;
    }

    return {
        getConnection: function() {
            if (!dbconn) {
                dbconn = connectToDB();
            }
            return dbconn;
        }
    };
})();


let neo4jboltconnection = (function() {
    let dbconn;

    function connectToDB() {
        console.log("**** Creating a new Graph DB Stream Connection ****");
        let driver = neo4jDriver.driver("bolt://localhost", neo4jDriver.auth.basic("neo4j", "password"));
        var session = driver.session();
        //console.log('Created bolt connection --->',db)

        return session;
    }

    return {
        getStreamConnection: function() {
            if (!dbconn) {
                dbconn = connectToDB();
            }
            return dbconn;
        }
    };
})();

module.exports = {
    neo4jconnection : neo4jconnection,
    neo4jboltconnection :neo4jboltconnection
}