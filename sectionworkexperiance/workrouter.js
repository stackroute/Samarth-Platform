var router = require('express').Router();
var workProcessor = require('./workprocessor');
var work = require("./workschema");

console.log("work processor: ", workProcessor);

//effective URL will /employee/:empid
router.get("/:candidateid", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    workProcessor.getworkexp(req.params.candidateid, function(workexps) {
        console.log(workexps);
        res.status(201).json(workexps);

    }, function(err) {
        res.status(500).json({ error: "Internal error occurred" });
    });
    //res.status(200).json(empObj);
});

/*router.get("/", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    workProcessor.getallSkill(function(workex) {
        console.log(workex);
        res.status(201).json(worksex);

    }, function(err) {
        res.status(500).json({ error: "Internal error occurred" });
    });
    //res.status(200).json(empObj);
});*/

router.post("/:candidateid", function(req, res) {
    
    /*work.find({ "candidateid": req.params.candidateid }, function(err, result) {
        if (result == "") {
            try {
                console.log("inside new workexp post")
                workProcessor.createworkexp(req.body, req.params.candidateid,
                    function(work) {
                        console.log("hi",work);
                        res.status(201).json(work);

                    },
                    function(err) {
                        res.status(500).json({ error: "Internal error occurred" });
                    })

            } //end try
            catch (err) {
                console.log("Error occurred in creating new workexperiance: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            } //end catch
        } else {*/
            workProcessor.addworkexp(req.body, req.params.candidateid, function(works) {
                console.log(works);
               
                res.status(201).json(works);

            }, function(err) {
                res.status(500).json({ error: "can't add experiance in the records" });
            });
      /*  }
    });*/
}); //end post

router.patch("/:candidateid", function(req, res) {
    try {
        console.log("inside new workexperiance post")
        workProcessor.updateworkexp(req.body, req.params.candidateid,
            function(work) {
                console.log(work);
                res.status(201).json(work);

            },
            function(err) {
                res.status(500).json({ error: "Internal error occurred" });
            })
    } //end try
    catch (err) {
        console.log("Error occurred in updating new workexperiance: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
}); //end patch
module.exports = router;
