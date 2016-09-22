var router = require('express').Router();
var workProcessor = require('./workprocessor');
var work = require("./workschema");

console.log("work processor: ", workProcessor);

/*Get the types of work for the given candidate id*/
//HTTP GET /work/:candidateid
//effective url work/:candidateid
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

/*Add new types of work for the given candidate id only after registration*/
//HTTP POST /work/:candidateid
//effective url work/:candidateid
router.post("/:candidateid", function(req, res) {

    work.find({ "candidateid": req.params.candidateid }, function(err, result) {
        console.log("inside get");
        if (result=="") {

            res.status(500).send("Register the Candidate before adding work experience ");
        } //end if
        else {
            workProcessor.addworkexp(req.body, req.params.candidateid, function(works) {
                console.log(works);

                res.status(201).json(works);

            }, function(err) {
                res.status(500).json({ error: "can't add experiance in the records" });
            });
        }
    }); //end find
}); //end post

/*update the types of work for the organisation with given candidate id note:(pass every field from body) */
//HTTP PATCH /work/:candidateid/::organisation
//effective url work/:candidateid/::organisation
router.patch("/:candidateid/:organisation", function(req, res) {
    work.find({ "candidateid": req.params.candidateid }, function(err, result) {
        if (result == "") {
            res.status(500).send("Add the work experience with the candidate id before updating");
        } else {
            try {
                console.log("inside new workexperiance post")
                workProcessor.updateworkexp(req.body, req.params.candidateid,req.params.organisation,
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
        }//end else
    });//end find
}); //end patch
module.exports = router;
