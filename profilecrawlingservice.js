let redis = require("redis");
let client = redis.createClient();
let profileProcessor = require('./profiles/profileprocessor');
let neo4jConnection = require("./connections/neo4jconnection");
let mongoose = require('mongoose');
let db = neo4jConnection.getConnection();

mongoose.connect('mongodb://localhost:27017/samarthplatformdb');
// let clientBlocking = client.duplicate();
// clientBlocking.brpop("test", 1);

function getdata(){
client.brpop("profilecrawling", 0, function(err, data) {
          console.log(' brpop: ' + data[1]);
          try {
        profileProcessor.inspectMissingProfileFields(data[1],
            function(result) {
                console.log("Result of findmissing ", result);
                // res.json(result);
            },
            function(err) {
                // return res.status(500).json({ error: err });
            });

    } catch (err) {
        console.log("error in missing field", err);
    }
          setTimeout(getdata, 1000);
});
}

getdata();