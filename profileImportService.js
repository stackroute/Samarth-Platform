let redis = require("redis");
let client = redis.createClient();
let candidateProcessor = require('./candidate/candidateprocessor');
let importprocessor = require('./import/importprocessor');
let neo4jConnection = require("./connections/neo4jconnection");
let mongoose = require('mongoose');
let db = neo4jConnection.getConnection();
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');
// let clientBlocking = client.duplicate();
// clientBlocking.brpop("test", 1);

function getdata(){
client.brpop("profileImport", 0, function(err, uploadedId) {
          
          console.log(' brpop: ' + uploadedId[1]);
          try {
          	importprocessor.getData(uploadedId[1], 
          		function(resData) {
          			console.log(resData[0].data);
          			let obj = resData[0].data;
          			for (var i = obj.length - 1; i >= 0; i--) {
		          		candidateProcessor.candidateProfileProcessor(obj[i],
									    function(result) {
									        console.log("Result  ", result);
									        // res.json(result);
							    },
							    function(err) {
							        // return res.status(500).json({ error: err });
							    });
          	};
          		},
          		function(err) {
							    console.log(err);
          	});
          	

   } catch (err) {
        console.log("error", err);
    }
          setTimeout(getdata, 1000);
});
}

getdata();