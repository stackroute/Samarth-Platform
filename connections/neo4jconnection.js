let connConfig = require('./../connConfig')();
let neo4j = require('neo4j');
let neo4jDriver = require('neo4j-driver').v1;

let neo4jconnection = (function() {
    let dbconn;
    let boltDBconn;

    function connectToDB() {
        console.log("**** Creating a new Graph DB Connection ****");
        let db = new neo4j.GraphDatabase(connConfig.neoconn);
        return db;
    }

    function connectBoltConnection() {
        console.log("**** Creating a new Graph DB Bolt Stream Connection ****");
        let driver = neo4jDriver.driver(("bolt://"+connConfig.neo4jhost), neo4jDriver.auth.basic(connConfig.neo4juser, connConfig.neo4jpwd));
        var session = driver.session();

        return session;
    }

    return {
        getConnection: function() {
            if (!dbconn) {
                dbconn = connectToDB();
            }
            return dbconn;
        },

        getBoltStreamConnection: function() {
            if (!boltDBconn) {
                boltDBconn = connectBoltConnection();
            }
            return boltDBconn;
        }
    };
})();

module.exports = neo4jconnection;
