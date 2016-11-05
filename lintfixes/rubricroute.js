let rubric = require('./rubricmodel');
let router = require('express').Router();

let rubricprocessor = require('./rubricprocesser');

/* Effective url /rubric/name

 */
router.get('/:typename', function(req, res) {
    console.log('Inside get');
    console.log(req.params.typename);
    try {
        rubricprocessor.getrubric(req.params.typename,
            function(rubricdata) {
                res.status(200).json(rubricdata);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log('Error occurred in getting rubric object: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});
module.exports = router;
// end router
// router.patch("/:profiletype", function(req, res) {
//     rubric.find({
//             "profiletype": req.params.profiletype
//         }, function(error, rubric) {
//             if (rubric = "") {

//                 res.status(500).send(
//                     "rubric doesnt exists, Add Candidate before updating...!");
//             } else {
//                 console.log("profiletype :", req.body.profiletype);
//                 if (!req.body.profiletype) {
//                     try {
//                         rubricprocessor.updaterubric(req.body, req.params.profiletype,
//                             function(rubricObj) {
//                                 res.status(201).json(rubricObj);
//                             },
//                             function(err) {
//                                 res.status(500).json(err);
//                             }
//                         );
//                     } catch (err) {
//                         console.log("Error occurred in updating rubric: ", err);
//                         res.status(500).json({
//                             error: "Internal error occurred, please report"
//                         });
//                     } //end catch
//                 } //end if
//                 else {
//                     res.status(500).send("Alert! Can't update profiletype... ");
//                 }
//             } //end else

//         }) //end find

// });
