let router = require('express').Router();
let circleProcessor = require('./circleProcessor');
let circleNeo4jProcessor = require('./circleNeo4jProcessor');

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
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});

router.get('/countdata/:profs', function(req, res) {

    try {
  //      
  var profs=req.params.profs.split("-");
        // console.log(profs);
        circleNeo4jProcessor.getCount(profs,
            function(data) {
                res.status(200).json(data);
            },
            function(err) {
                res.json(err);
            });
        
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});

router.get('/getCandidate/:profs', function(req, res) {

    try {

        var profs=req.params.profs.split("-");
        circleNeo4jProcessor.getCandidate(profs,
            function(data) {
               res.status(200).json(data);
           },
           function(err) {
            res.json(err);
        });
        
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});

router.get('/getStatus/:profs', function(req, res) {

    try {
  //      
        var profs=req.params.profs.split("-");
               circleNeo4jProcessor.getStatus(profs,
        function(data) {
             res.status(200).json(data);
              },
              function(err) {
                res.json(err);
              });

    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
});


router.get('/appliedData/:profs', function(req, res) {

    try {
  //      
  var profs=req.params.profs.split("-");
        // console.log(profs);
        circleNeo4jProcessor.getApplied(profs,
            function(data) {

                res.status(200).json(data);
            },
            function(err) {
                res.json(err);
            });
        
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
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
