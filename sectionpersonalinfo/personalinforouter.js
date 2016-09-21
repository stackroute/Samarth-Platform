var router = require('express').Router();
var personalInfoProcessor = require('./personalInfoprocessor');
var persons = require("./personalinfoschema");

/*update personal info only after registration of candidate*/
//HTTP POST personalinfo/:candidateid
//effective url personalinfo/:candidateid/
router.post("/:candidateid", function(req, res) {
    persons.find({ "candidateid": req.params.candidateid }, function(err, result) {
        if(result==""){
            res.status(500).send("Register candidates before updating personal info");
        }//end if
        else{
            if(!req.body.candidateid){
                try {
                    personalInfoProcessor.updatePersonalinfo(req.body, req.params.candidateid,
                        function(personalinfo) {
                            console.log("inside pi");
                            res.status(201).json(personalinfo);
                        },
                        function(err) {
                            console.log("Error occurred in updating new perosnal info detail: ", err);
                            res.status(500).json({ error: "Internal error occurred, please report" });
                        });
                    // res.status(201).json(addEdu);
                } catch (err) {
                    console.log("Error occurred in adding new perosnal info detail: ", err);
                    res.status(500).json({ error: "Internal error occurred, please report" });
                }
            }//end if inside else
            else{
                res.status(500).send("Alert !!! Cant update the Candidate id");
            }
        }
    });
}); //end post

/*get personal info of the candidate id*/
//HTTP GET personalinfo/:candidateid
//effective url personalinfo/:candidateid/
router.get("/:candidateid", function(req, res) {

    personalInfoProcessor.getPersonalinfo(req.params.candidateid,

        function(getperson) {
            console.log(getperson);
            res.status(201).json(getperson);

        },

        function(err) {
            res.status(500).json({ error: "Internal error occurred" });
        });
});


module.exports = router;
