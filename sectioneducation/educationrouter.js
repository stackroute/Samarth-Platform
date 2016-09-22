var router = require('express').Router();
var educationProcessor = require('./educationprocessor');
var eduModel = require('./educationschema');
/*Get Qualification details of the given candidate id*/
//HTTP GET education//:candidateid/
//effective url /education//:candidateid
router.get("/:candidateid", function(req, res) {
    //console.log("Request received for emp id: ", req.params.empid);
    educationProcessor.getEducation(req.params.candidateid, function(educationObject) {
        console.log(educationObject);
        res.status(201).json(educationObject);
    }, function(err) {
        res.status(500).json({ error: "Internal error occurred" });
    });
    //res.status(200).json(empObj);
});

/*Add Qualification details of the given candidate id after registration*/
//HTTP Post education//:candidateid/
//effective url /education//:candidateid
router.post("/:candidateID", function(req, res) {
    eduModel.find({ "candidateid": req.params.candidateID }, function(err, result) {
        if (result=="") {

            res.status(500).send("Register Candidate with the given candidate id");
        } //end if
        else {
            try {
                educationProcessor.addEducation(req.body, req.params.candidateID,
                    function(updatedEdu) {
                        res.status(201).json(updatedEdu);
                    },
                    function(err) {
                        console.log("Error occurred in updating new educational detail: ", err);
                        res.status(500).json({ error: "Internal error occurred, please report" });
                    });
                // res.status(201).json(addEdu);
            } catch (err) {
                console.log("Error occurred in adding new educational detail: ", err);
                res.status(500).json({ error: "Internal error occurred, please report" });
            }
        }
    }); //find ends

}); //post ends

/*Update Qualification details of the given candidate id by giving title in the parameter NOTE:(add evry field in the object while update)*/
//HTTP Patch education//:candidateid/:title
//effective url /education//:candidateid/:title
router.patch("/:candidateID/:title", function(req, res) {
    eduModel.find({ "candidateid": req.params.candidateID }, function(err, result) {
        if (err || result == "") {

            res.status(500).send("Add Education collection with the given candidate id before Update");
        } else {
            console.log("CANDIDATE FOUND");
            // res.status(201).json({'success':"FOUND"});

            try {
                educationProcessor.updateEducation(req.params.candidateID, req.params.title, req.body,
                    function(updatedEdu) {
                        res.status(201).json(updatedEdu);
                    },
                    function(err) {
                        console.log("updating new educational detail with invalid data ", err);
                        res.status(500).send("updating new educational detail with invalid data " );
                    });
                // res.status(201).json(addEdu);
            } catch (err) {
                console.log("Error occurred in adding new educational detail: ", err);
                res.status(500).json({ error: "Internal error occurred, please report" });
            }
        }//end else
    });//end find
});
// router.delete("/:candidateID/:id", function(req, res) {
//     eduModel.find({ "candidateID": req.params.candidateID }, function(err, result) {
//         if (err || result == "") {
//             console.log("CANDIDATE NOT FOUND");
//             res.status(500).json({ 'fail': "NOT FOUND" });
//         } else {
//             console.log("CANDIDATE FOUND");
//             try {
//                 educationProcessor.deleteEducation(req.params.candidateID, req.params.id, req.body,
//                     function(deletedEdu) {
//                         res.status(201).json(deletedEdu);
//                     },
//                     function(err) {
//                         console.log("Error occurred in deleting educational detail: ", err);
//                         res.status(500).json({ error: "Internal error occurred, please report" });
//                     });
//                 // res.status(201).json(addEdu);
//             } catch (err) {
//                 console.log("Error occurred in deleting new educational detail: ", err);
//                 res.status(500).json({ error: "Internal error occurred, please report" });
//             }
//         }
//     });
// });
module.exports = router;
