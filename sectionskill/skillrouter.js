var router = require('express').Router();
var skillProcessor = require('./skillprocessor');
var skillRelationBuilder = require("./skillrelationbuilder");
var skill = require("./skillschema");

/*Get the skills for the given candidate id*/
//HHTP GET skill/:candidateid
//effective URL skill/:candidateid 
router.get("/:candidateid", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    try {
        skillProcessor.getSkill(req.params.candidateid,
            function(skill) {
                // console.log(skill);
                res.status(200).json(skill);
            },
            function(err) {
                res.status(500).json(err);
            });

    } catch (err) {
        console.log("Error occurred in fetching skill: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }

    // }, function(err) {
    //     res.status(500).json({ error: "Internal error occurred" });
    // });
    //res.status(200).json(empObj);
});

/*Add new skill with candidate id only if the candidate is registered*/
//HTTP POST /skill/:candidateid

//effective url  /skill/:candidateid
router.post("/:candidateid", function(req, res) {
    skill.find({
        "candidateid": req.params.candidateid
    }, function(err, result) {

        if (err) {
            console.log("Error in posting new skill for cnadidate ", err);
        }

        if (!result) {
            console.log("Candidate skill record not found");
            return res.status(200).send("Candidate skill record not found");
        }

        console.log("Got the result as : ", result);

        if (result == "") {
            res.status(500).send(
                "Register candidate for the given candidate id");
        } //end if  
        else {
            try {
                skillProcessor.addSkill(req.body, req.params.candidateid,
                    function(skills, id) {
                        skillRelationBuilder.skillRelationBuilder(
                            skills, id,
                            function(err, success) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    // console.log("created relationship");                            
                                }
                            });

                        res.status(201).json(skills);
                    },
                    function(err) {
                        console.log("Error occurred in adding skill: ", err);
                        res.status(500).send("invalid data");
                    });
            } //end try
            catch (err) {
                // console.log("Error occurred in creating new skill: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            } //end catch
        }
    }); //end find
}); //end post

/*Update a given skill by passing the skillname for the given candidate id.. NOTE:(provide the skill object with evry field)*/
//HTTP PATCH /skill/:candidateid/:skillname
//effective url /skill/:candidateid/:skillname
router.patch("/:candidateid/:skillname", function(req, res) {
    console.log(
        "under patch fxn of skill --------------------------------------------------------->" +
        req.body);
    skill.find({
        "candidateid": req.params.candidateid
    }, function(err, result) {
        if (result == "") {
            res.status(500).send(
                "skill section doesnt exist while updating new skill");
        } else {
            try {
                // console.log("inside new skill post")
                skillProcessor.updateSkill(req.params.skillname, req.body,
                    req.params.candidateid,
                    function(skill) {
                        // console.log(skill);
                        res.status(201).json(skill);

                    },
                    function(err) {
                        res.status(500).send("Invalid data");
                    })

            } //end try
            catch (err) {
                // console.log("Error occurred in updating new skill: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            }
        } //end else
    }); //end find
}); //end patch

module.exports = router;
