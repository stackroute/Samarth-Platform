let router = require('express').Router();

router.get('/profession', function(req, res) {
    try {

        candidateneo.getProfessions(function(professions) {


            res.status(200).json(professions);
        }, function(err) {
            res.status(500).json(err);
        });
    } catch (err) {

        res.status(500).json({
            error: 'Server error...try again later'
        });
    }
});


router.get('/location', function(req, res) {
    try {

        candidateneo.getProfessions(function(professions) {


            res.status(200).json(professions);
        }, function(err) {
            res.status(500).json(err);
        });
    } catch (err) {

        res.status(500).json({
            error: 'Server error...try again later'
        });
    }
});


module.exports = router;
