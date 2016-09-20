var question = require('./questionschema');

function getquestions(candidateId,section, successCB, errorCB) {

     question.find({ "candidateid": candidateId,"questions.section":section},function(error, result) {
         if (error) {
             console.log(error);
             errorCB(error);
         }
         //console.log("Inside get questions Function" + result.questions.question);
         successCB(result);
     });

};

function createNewQuestions(newquestionobj, candidateId, sucessCB, errorCB) {
    var questionObj = new question({
        candidateid:candidateId,
        questions: []
    });
    questionObj.questions.push(newquestionobj.questions[0]);
    console.log("inside createQuestionsect:");

    questionObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log('New question created', result);
        sucessCB(result);

    });
}

function modifyQuestions(oldQustionsObj, candidateId, successCB, errorCB) {
    
    question.update({ "candidateid": candidateId }, { $push: { "questions": oldQustionsObj.questions[0] } },
        function() {
            successCB("question added")

        }
    );
};

module.exports = {
    getquestions: getquestions,
    modifyQuestions:modifyQuestions,
    createNewQuestions:createNewQuestions
};
