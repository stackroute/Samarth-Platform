let redis = require("redis");
let client = redis.createClient();
let candidateProcessor = require('./candidate/candidateprocessor');
// let clientBlocking = client.duplicate();
// clientBlocking.brpop("test", 1);

function getdata(){
client.brpop("profileImport", 0, function(err, id) {
          console.log(' brpop: ' + id);
          try {
          	for (var i = data.length - 1; i >= 0; i--) {
          		candidateProcessor.candidateProfileProcessor(data[i],
							    function(result) {
							        console.log("Result  ", result);
							        // res.json(result);
							    },
							    function(err) {
							        // return res.status(500).json({ error: err });
							    });
          	};

   } catch (err) {
        console.log("error", err);
    }
          setTimeout(getdata, 1000);
});
}

getdata();