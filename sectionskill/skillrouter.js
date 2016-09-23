var router = require('express').Router();
var skillProcessor = require('./skillprocessor');
var skill = require("./skillschema");


/*Get the skills for the given candidate id*/
//HHTP GET skill/:candidateid
//effective URL skill/:candidateid
router.get("/:candidateid", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    skillProcessor.getSkill(req.params.candidateid, function(skill) {
        console.log(skill);
        res.status(201).json(skill);

    }, function(err) {
        res.status(500).json({ error: "Internal error occurred" });
    });
    //res.status(200).json(empObj);
});

/*Add new skill with candidate id only if the candidate is registered*/
//HTTP POST /skill/:candidateid
//effective url  /skill/:candidateid
router.post("/:candidateid", function(req, res) {
    skill.find({ "candidateid": req.params.candidateid }, function(err, result) {
        if (result == "") {
            res.status(500).send("Register candidate for the given candidate id");

        } //end if 
        else {
            try {
                skillProcessor.addSkill(req.body, req.params.candidateid, function(skills) {
                    console.log(skills);
                    // res.status(201).json(skills);
                    res.status(201).json(skills);

                }, function(err) {
                    res.status(500).send("invalid data");
                });
            } //end try
            catch (err) {
                console.log("Error occurred in creating new skill: ", err);
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
    skill.find({ "candidateid": req.params.candidateid }, function(err, result) {
        if (result == "") {
            res.status(500).send("skill section doesnt exist while updating new skill");
        } else {
            try {
                console.log("inside new skill post")
                skillProcessor.updateSkill(req.params.skillname, req.body, req.params.candidateid,
                    function(skill) {
                        console.log(skill);
                        res.status(201).json(skill);

                    },
                    function(err) {
                        res.status(500).send("Invalid data");
                    })

            } //end try
            catch (err) {
                console.log("Error occurred in updating new skill: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            }
        } //end else
    }); //end find
}); //end patch

// router.delete("/:candidateid/:skillname", function(req, res) {
//         try {
//             console.log("inside delete a skill", req.params.skillname)
//             skillProcessor.deleteASkill(req.params.skillname, req.params.candidateid,
//                 function(skill) {
//                     console.log(skill);
//                     res.status(201).json(skill);

//                 },
//                 function(err) {
//                     res.status(500).json({ error: "Internal error occurred" });
//                 })

//         } //end try
//         catch (err) {
//             console.log("Error occurred in deleting skill section: ", err);
//             res.status(500).json({
//                 error: "Internal error occurred, please report"
//             });
//         }
//     }) //end delete
// router.delete("/:candidateid", function(req, res) {
//         try {
//             console.log("inside delete skill section", req.params.skillname)
//             skillProcessor.deleteSkill(req.params.candidateid,
//                 function(skill) {
//                     console.log(skill);
//                     res.status(201).json(skill);

//                 },
//                 function(err) {
//                     res.status(500).json({ error: "Internal error occurred" });
//                 })

//         } //end try
//         catch (err) {
//             console.log("Error occurred in deleting skill section: ", err);
//             res.status(500).json({
//                 error: "Internal error occurred, please report"
//             });
//         }
//     }) //end delete



module.exports = router;
