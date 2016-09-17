var router = require('express').Router();
var skillProcessor = require('./skillprocessor');
var skill = require("./skillschema");

console.log("Skill processor: ", skillProcessor);

//effective URL will /employee/:empid
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

router.get("/", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    skillProcessor.getallSkill(function(skills) {
        console.log(skills);
        res.status(201).json(skills);

    }, function(err) {
        res.status(500).json({ error: "Internal error occurred" });
    });
    //res.status(200).json(empObj);
});

//effective url  /employee/
router.post("/:candidateid", function(req, res) {
    // skill.find({ "candidateid": req.params.candidateid }, function(err, result) {
        // if (result == "") {
        //     try {
        //         console.log("inside new skill post")
        //         skillProcessor.createNewSkill(req.body, req.params.candidateid,
        //             function(skill) {
        //                 console.log("hi", skill);
        //                 res.status(201).json(skill);

        //             },
        //             function(err) {
        //                 res.status(500).json({ error: "Internal error occurred" });
        //             })

        //     } //end try
        //     catch (err) {
        //         console.log("Error occurred in creating new skill: ", err);
        //         res.status(500).json({
        //             error: "Internal error occurred, please report"
        //         });
        //     } //end catch
        // } else {
            skillProcessor.addSkill(req.body, req.params.candidateid, function(skills) {
                console.log(skills);
                // res.status(201).json(skills);
                res.status(201).json(skills);

            }, function(err) {
                res.status(500).json({ error: "can't add skill in the records" });
            });
    //     }
    // });
}); //end post

router.patch("/:candidateid/:skillname", function(req, res) {
    try {
        console.log("inside new skill post")
        skillProcessor.updateSkill(req.params.skillname,req.body, req.params.candidateid,
            function(skill) {
                console.log(skill);
                res.status(201).json(skill);

            },
            function(err) {
                res.status(500).json({ error: "Internal error occurred" });
            })

    } //end try
    catch (err) {
        console.log("Error occurred in updating new skill: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
}); //end patch

router.delete("/:candidateid/:skillname",function(req,res){
     try {
        console.log("inside delete a skill",req.params.skillname)
        skillProcessor.deleteASkill(req.params.skillname,req.params.candidateid,
            function(skill) {
                console.log(skill);
                res.status(201).json(skill);

            },
            function(err) {
                res.status(500).json({ error: "Internal error occurred" });
            })

    } //end try
    catch (err) {
        console.log("Error occurred in deleting skill section: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
})//end delete

router.delete("/:candidateid",function(req,res){
     try {
        console.log("inside delete skill section",req.params.skillname)
        skillProcessor.deleteSkill(req.params.candidateid,
            function(skill) {
                console.log(skill);
                res.status(201).json(skill);

            },
            function(err) {
                res.status(500).json({ error: "Internal error occurred" });
            })

    } //end try
    catch (err) {
        console.log("Error occurred in deleting skill section: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
})//end delete



module.exports = router;
