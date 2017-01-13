let router = require('express').Router();
let professionskillprocessor = require('./professionskillprocessor');
router.post('/profession', function(req, res) {
    try {
        professionskillprocessor.createprofessiontoskill(req.body.profession, req.body.skills,
             req.body.roles, function(success) {
                return res.status(200).send(success);
            },
            function(err) {
                return res.status(500).send(err);
            });
    } catch (err) {
        return res.status(500).send(err);
    }
});
module.exports = router;
