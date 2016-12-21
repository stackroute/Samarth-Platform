var router = require('express').Router();
var async = require('async');
var jobProfile = require('./jobProfileSchema');
var jobProfileProcessor = require('./jobProfileProcessor');
let jobProfileNeo = require('./jobProfileNeoProcessor');

//Routes defined

//post job
router.post('/jobpost',function(req,res){
	try{
   var jobData = req.body;
   var jobCode="";
   jobProfileProcessor.getJobDetails(jobData.jpCode, jobData.desc.title,
     function successFn(result) {
      console.log("result length "+result.length);
      if (result.length > 0) {
       console.log("in if route");
       res.status(200).json({status:'failed',msg:'Job with this title is already posted by you! try with some other title'});
     }else{
      console.log("else job route");
      jobProfileProcessor.addJob(jobData, function successFn(message){
       res.status(200).json({status:'success',msg:'Job posted successfully!'});
       jobProfileNeo.createJobNode(jobData, function(err, stat) {
        if (err) {
          console.log(err);
        } else {
          console.log(stat);
        }
      });
     },function errorFn(error){
      res.status(200).json({status:'failed',error:'Some error occurred in job posting!'});
    })
    }  
  },function errorFn(error) {
    res.status(500).json({status:'failed',error:'Some error occurred'});
  });
 } catch(err){
  return res.status(500).send("Some error occurred");
}
});

//get jobs
router.get('/getjobs', function(req, res) {
  try {
    jobProfileProcessor.getJobs(function successFn(result) {
      res.status(200).send(result);
    }, function errorFn(error) {
      res.status(500).send(error);
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal error occured, please report' });
  }
});

router.get('/:getjobcodedata', function(req, res) {
 try {
   var jobcode=req.params.getjobcodedata;
   console.log(jobcode);
   jobProfileProcessor.getJobsbyJobId(jobcode,function successFn(result) {
     res.status(200).json(result);
   }, function errorFn(error) {
     res.status(500).send(error);
   });
 } catch (err) {
   res.status(500).json({ error: 'Internal error occured, please report' });
 }
});

router.get('/searchJobs/:searchTxt/:profs', function(req, res) {
  var jobs=[];
  var count = 0 ;
  try {
   var searchTxt=req.params.searchTxt;
   var profs=req.params.profs;
   var prof=profs.split('-');
   var resArr=searchTxt.split(' ');
       // var jobs=[];
       // console.log(prof);
       // var resArr=searchTxt.split(' ');
       jobProfileNeo.getJobs(resArr,prof,
        function(data) {
                // res.json(data);

                //async
                async.forEachOf(data, function(value, key, callback) {
                  console.log('data',data.length);
                  count = count + 1;
                  console.log('count',count);
                  if(Object.keys(value).includes('name')) {
                   jobProfileProcessor.getJobsbyJobId(value.name,function successFn(result) {
           // res.status(200).json(result);

           jobs.push(result);
       if(data.length === count) {
          console.log('hello');
          callback(); // tell async that the iterator has completed          
          // res.status(200).json({abc: jobs});
        }
 
           // res.status(200).json(jobs);
           // console.log(jobs);
         }, function errorFn(error) {
           res.status(500).send(error);
         });
        }
  },function(err) {
    console.log('done');
    console.log(jobs);
    res.status(200).json(jobs);
  })
              },
              function(err) {
                res.json(err);
              });
} catch (err) {
 res.status(500).json({ error: 'Internal error occured, please report' });
}
});


module.exports = router ;