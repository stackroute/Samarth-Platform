var router = require('express').Router();
var educationProcessor = require('./educationprocessor');
var eduModel=require('./educationschema');
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
router.get("/", function(req, res) {
  try {
    console.log('About to try get education document...!');
    // var eduObj = educationProcessor.getEducation();
//=============callback method==============================//
    educationProcessor.getAllEducation(function(eduObj) {
      res.status(201).json(eduObj);
    }, function(err){
      res.status(500).json(err);
    });
//=============callback method ends==============================//
//=============promise method==============================//
    // educationProcessor.getEducation().then(function(eduObj) {      
    //   console.log('Returned with resolve step 1');
    //   // res.status(201).json(eduObj);
    //     educationProcessor.getEducation().then(function(edu){
    //       res.status(201).json(edu);          
    //     });
    // }, function(err){
    //   res.status(500).json(err);
    // });
    
    // console.log("Got the object: ", eduObj);
  //=============promise method ends==============================//
    
  } catch (err) {
    console.log("Error occurred in fetching educational details: ", err);
    res.status(500).json({
      error: "Internal error occurred, please report"
    });
  }
});
router.post("/:candidateID", function(req, res) {
 /* eduModel.find({"candidateid":req.params.candidateID},function(err,result)
  {
    if(err||result=="")
    {
      try {
            educationProcessor.addEducation(req.body,req.params.candidateID,
            function(addedEdu){
              res.status(201).json(addedEdu);
            },
            function(err){
              console.log("Error occurred in adding new educational detail: ", err);
              res.status(500).json({error: "Internal error occurred, please report"});
              });
            // res.status(201).json(addEdu);
          }
      catch (err) 
      {
        console.log("Error occurred in adding new educational detail: ", err);
        res.status(500).json({error: "Internal error occurred, please report"});
      }
    }
    else
    {*/
      try {
            educationProcessor.updateEducation(req.body,req.params.candidateID,
            function(updatedEdu){
              res.status(201).json(updatedEdu);
            },
            function(err){
              console.log("Error occurred in updating new educational detail: ", err);
              res.status(500).json({error: "Internal error occurred, please report"});
              });
            // res.status(201).json(addEdu);
          }
      catch (err) 
      {
        console.log("Error occurred in adding new educational detail: ", err);
        res.status(500).json({error: "Internal error occurred, please report"});
      }
  /*  }
  });//find ends*/
 
});//post ends
router.patch("/:candidateID/:id", function(req, res) {
  eduModel.find({"candidateid":req.params.candidateID},function(err,result)
  {
    if(err||result=="")
    {
      console.log("CANDIDATE NOT FOUND");
      res.status(500).json({'fail':"NOT FOUND"});
    }
    else
    {
      console.log("CANDIDATE FOUND");
      // res.status(201).json({'success':"FOUND"});
      
      try {
            educationProcessor.modifyExistingEducation(req.params.candidateID,req.params.id,req.body,
            function(updatedEdu){
              res.status(201).json(updatedEdu);
            },
            function(err){
              console.log("Error occurred in updating new educational detail: ", err);
              res.status(500).json({error: "Internal error occurred, please report"});
              });
            // res.status(201).json(addEdu);
          }
      catch (err) 
      {
        console.log("Error occurred in adding new educational detail: ", err);
        res.status(500).json({error: "Internal error occurred, please report"});
      }
    }
  });
});
router.delete("/:candidateID/:id", function(req, res) {
  eduModel.find({"candidateID":req.params.candidateID},function(err,result)
  {
    if(err||result=="")
    {
      console.log("CANDIDATE NOT FOUND");
      res.status(500).json({'fail':"NOT FOUND"});
    }
    else
    {
      console.log("CANDIDATE FOUND");      
      try {
            educationProcessor.deleteEducation(req.params.candidateID,req.params.id,req.body,
            function(deletedEdu){
              res.status(201).json(deletedEdu);
            },
            function(err){
              console.log("Error occurred in deleting educational detail: ", err);
              res.status(500).json({error: "Internal error occurred, please report"});
              });
            // res.status(201).json(addEdu);
          }
      catch (err) 
      {
        console.log("Error occurred in deleting new educational detail: ", err);
        res.status(500).json({error: "Internal error occurred, please report"});
      }
    }
  });
});
module.exports = router;