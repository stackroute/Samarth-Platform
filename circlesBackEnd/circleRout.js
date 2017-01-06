let router = require('express').Router();
let circleProcessor = require('./circleProcessor');
let circleNeo4jProcessor = require('./circleNeo4jProcessor');
let async = require('async');

router.get('/:entityname', function(req, res) {
    try {
        console.log(req.params);
        circleProcessor.getCircle(req.params,
            function(data) {
                res.json(data);
                console.log(data);
            },
            function(err) {
                res.json(err);
            });
    } 
    catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});

router.get('/getStats/:profs', function(req, res) {
    try {
        var arr =[];
        var profs=req.params.profs.split("-");

        async.parallel({
            lookingCount: function(callback) {
                circleNeo4jProcessor.getCount(profs,
                    function(lookingCountobj) {
                        callback(null,lookingCountobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                    );
            },
            appliedCount: function(callback) {
                circleNeo4jProcessor.getCandidate(profs,
                    function(appliedCountobj) {
                        callback(null, appliedCountobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                );
            },
            placedCount: function(callback) {
                circleNeo4jProcessor.getStatus(profs,
                    function(placedCountobj) {
                        callback(null, placedCountobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                );
            },
            expiredJobCount: function(callback) {
                circleNeo4jProcessor.getExpiredJob(profs,
                    function(expiredJobCountobj) {
                        callback(null, expiredJobCountobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                );
            },
            jobCount: function(callback) {
                circleNeo4jProcessor.getJob(profs,
                    function(jobCountobj) {
                        callback(null, jobCountobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                );
            }
        },
        function(err, results) {
        if (err) {
        console.log('ERR ----------------->: ', err);
        }
        else{
            let arr=[];  
            for(var i=0; i<results.lookingCount.length;i++) {
                let obj = {
                "profession":results.lookingCount[i].profession,
                "Candidates": results.lookingCount[i].Candidates,
                "Looking":results.lookingCount[i].Looking,
                "applied":results.appliedCount[i].applied,
                "placed":results.placedCount[i].placed,
                "job":results.jobCount[i].job,
                "expiredJobs":results.expiredJobCount[i].expiredjobs,
                "availableJobs":results.jobCount[i].job - results.expiredJobCount[i].expiredjobs
                };
                arr.push(obj);
                obj = {}; 
            }
            res.status(200).json(arr);
        }
    }
    ); 
    }
    catch (err) {
        console.log("Internal Error Occurred inside catch");
        return res.status(500).send(
            'Internal error occurred, please report or try later...!');
    }
});

router.post('/circlerelation',
    function(req, res) {
        try {
            circleProcessor.createRelation(req, function(err) {
                console.log(err);
            }, function(result) {
                console.log(result);
            });
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
        }
    });

// creating circles in graph and mongo
// Effective URL is HTTP POST /circles/
// router.post('/', function(req, res) {
    router.post('/', function(req, res) {
        try {
            circleProcessor.circlePost(req.body,
                function(err) {
                    if (err) {

                        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
                    }
                });
    } // end try
    catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    } // end c
});
  module.exports = router;