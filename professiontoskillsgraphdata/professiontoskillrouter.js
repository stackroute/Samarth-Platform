var router = require('express').Router();
var professionskillprocessor = require('./professionskillprocessor');
router.post("/profession", function(req, res) {
    try {
        professionskillprocessor.createprofessiontoskill(req.body.profession,req.body.skills,req.body.roles,
            function(success) {
                //console.log("success");
                return res.status(200).send("Sucess");
            },
            function(err) {
                return res.status(500).send(err);
            });
    } catch (err) {
        return res.status(500).send(err);
    }

});
module.exports = router;
