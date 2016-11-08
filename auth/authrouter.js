let router = require('express').Router();
let authByToken = require('./authbytoken');

// Effective url /auth/client
router.post('/client', function(req, res) {
    try {
        authByToken.authenticateClient(req.body.cid, req.body.cs,
            function(err, token) {
                if (err) {
                    return res.status(403).json(err);
                }
                return res.json(token);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
       // console.error('Error occurred in authorizing client ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
});

// Effective url /auth/candidate
router.post('/candidate', function(req, res) {
    try {
        authByToken.authenticateCandidate(req.body.cid, req.body.ct,
            function(err, candidateProfile, token) {
                // Success callback
                if (err) {
                   // console.log('Err in authenticating ', err);
                    return res.status(403).json(err);
                }

                return res.json({
                    candidate: candidateProfile,
                    token: token
                });
            },
            function(err) {
                // Unauthorized call back
                return res.status(403).json(err);
            });
    } catch (err) {
       // console.error('Error occurred in authorizing candidate ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
});

module.exports = router;
