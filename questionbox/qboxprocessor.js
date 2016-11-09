let qboxquestionModel = require('./qboxquestions');
// let skillProcessor = require('.././sectionskill/skillprocessor');
let skill = require(".././sectionskill/skillschema");
// var fieldQCache = require('./fieldQCache');
 
function getAllBoxQuestions(successCB, errorCB) {
       qboxquestionModel.find({}, { _id: 0, __v: 0 }, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
} 

function getQuestions(candidateid, sections, skip, limit, successCB, errorCB) {
 // console.log('under ques processor');
    let findClause = { candidateid: candidateid, status: 'pending' };
    let pagination = { skip: parseInt(skip), limit: parseInt(limit) };

    if (sections.length > 0) {
        findClause.section = { $in: sections };
    }

    qboxquestionModel.find(findClause, { _id: 0, __v: 0 }, pagination, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
}
 
//function for inserting the array of objects for each section
function insertPendindData(newquestionArray,sucessCB,errorCB)
{ 
    console.log("----------->array of objects---------->"+newquestionArray);
    qboxquestionModel.insertMany(newquestionArray,function(result)
    {
        console.log("------>result from  insertMany------->"+result);
    },
    function(err)
    {
        console.log("-=------->errr from inserrt many-------->"+err);
    });
}
 function createNewQuestions(newquestionobj, candidateId, sucessCB, errorCB) {
  // console.log('under create new ques------------------------->'+newquestionobj.length);
    let questionObj = new qboxquestionModel({
        candidateid: candidateId,
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        instancename: newquestionobj.instancename,
        response: newquestionobj.response,
        status: newquestionobj.status
    });

    // console.log("instancename------------------>",newquestionobj.instancename);
    // fieldQCache.getQboxQuestions(questionObj);
    questionObj.save(function(err, result) {
        if (err) {
          //  console.log(err);
            errorCB(err);
        }else{
            sucessCB(result);
        }
        
    });
}

function updateQuestion(questionobj, candidateId, answer, sucessCB, errorCB) {
   
 // skill.find({
 //        candidateid: candidateId 
 //    }, function(err, skill) {
 //        if (err) {
 //          console.log("error  in skill finding");
 //        }
 //        console.log(skill.skills);
        
 //    });
    // console.log("------->ans in qbox------->"+answer);
    qboxquestionModel.update({'candidateid': candidateId, 'section': questionobj.section,
     'fieldname': questionobj.fieldname, 'instancename': questionobj.instancename }, {

            '$set': {
                'response': answer,
                'status': 'answered',
            }

        },
        function(err) {
             if (err) {
          //  console.log(err);
            errorCB(err);
        }
            sucessCB('Question updated');
        }

       
    );
}

module.exports = {
    getAllBoxQuestions: getAllBoxQuestions,
    getQuestions: getQuestions,
    insertPendindData: insertPendindData,
    createNewQuestions: createNewQuestions,
    updateQuestion: updateQuestion
};
