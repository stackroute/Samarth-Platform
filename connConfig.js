let connConfig = function () {
    return {
        "neoconn" : "http://neo4j:password@localhost:7474",
        "mongoconn":"mongodb://localhost:27017/samarthplatformdb"
    }
}

module.exports = connConfig;