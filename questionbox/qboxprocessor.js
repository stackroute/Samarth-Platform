var qboxquestionModel = require('./qboxquestions'); 
//var fieldQCache = require('./fieldQCache');

function getAllBoxQuestions(successCB, errorCB) {
       qboxquestionModel.find({}, { _id: 0, __v: 0 }, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
} 

function getQuestions(candidateid, sections, skip, limit, successCB, errorCB) {
  console.log("under ques processor");
    var findClause = { "candidateid": candidateid, "status": "pending" };
    var pagination = { skip: parseInt(skip), limit: parseInt(limit) };

    if (sections.length > 0) {
        findClause['section'] = { $in: sections };
    }

    qboxquestionModel.find(findClause, { _id: 0, __v: 0 }, pagination, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
}

 function createNewQuestions(newquestionobj, candidateId, sucessCB, errorCB) {
   console.log("under create new ques------------------------->");
    var questionObj = new qboxquestionModel({
        candidateid: candidateId,
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        instancename: newquestionobj.instancename,
        response: newquestionobj.response,
        status: newquestionobj.status
    });
    //fieldQCache.getQboxQuestions(questionObj);
    questionObj.save(function(err, result) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        sucessCB(result);
    });
}

function updateQuestion(questionobj, candidateId, answer, sucessCB, errorCB) {
    qboxquestionModel.update({ "candidateid": candidateId, 'section': questionobj.section, 'fieldname': questionobj.fieldname, 'instancename': questionobj.instancename }, {
            '$set': {
                'response': answer,
                'status': 'answered',
            }
        },
        function() {
            sucessCB("Question updated");
        }

    );
}
 
module.exports = {
    getAllBoxQuestions : getAllBoxQuestions,
    getQuestions: getQuestions,
    createNewQuestions: createNewQuestions,
    updateQuestion: updateQuestion
};
