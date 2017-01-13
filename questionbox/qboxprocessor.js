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

function getQuestions(candidateid, sections, skip, limit, lang, successCB, errorCB) {
    // console.log('under ques processor');
    let findClause = { candidateid: candidateid, status: 'pending' };
    let pagination = { skip: parseInt(skip), limit: parseInt(limit) };

    if (sections.length > 0) {
        findClause.section = { $in: sections };
    }

    qboxquestionModel.find(findClause, { _id: 0, __v: 0 }, pagination, function(error, colln) {
        if (error) {
            console.log("qboxquestionModel error")
            errorCB(error);
        }
        successCB(colln);
    });
}

//function for inserting the array of objects for each section
function insertPendindData(newquestionArray, sucessCB, errorCB) {
    newquestionArray.forEach(function(element, index, obj) {
        new qboxquestionModel(element).save(function(error, s) {
            if (error)
                console.log("Error occurred" + error);
            else
                console.log("Success!!!");
        })

    })
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
        } else {
            sucessCB(result);
        }

    });
}

function createNewQuestionColln(questionColln, sucessCB, errorCB) {
    console.log('createNewQuestionColln');
    if (questionColln.length > 0) {
        qboxquestionModel.insertMany(questionColln, function(err, resultColln){
            if(err){
                errorCB(err);
            } 

            sucessCB(resultColln);
        });
    } else {
        errorCB("Empty data passed for saving..!");
    }

}
 
function updateQuestion(questionobj, candidateId, answer, sucessCB, errorCB) {
 
    qboxquestionModel.update({
            'candidateid': candidateId,
            'section': questionobj.section,
            'fieldname': questionobj.fieldname,
            'instancename': questionobj.instancename
        }, {

            '$set': {
                'response': answer,
                'status': 'answered',
            }

        },
        function(err, result) {
            if (err) {
                //  console.log(err);
                errorCB(err);
            }
            sucessCB(result);
        }
    );
}


function setClosedStatusQuestion(candidateId,questionobj,sucessCB, errorCB) {
 
    qboxquestionModel.update({
            'candidateid': candidateId,
            'section': questionobj.section, 
            'fieldname': questionobj.fieldname,
            'instancename': questionobj.instancename,
            'response': questionobj.response
        }, {

            '$set': {
                'status': 'closed'
            }

        },
        function(err, result) {
            if (err) {
                //  console.log(err);
                errorCB(err);
            }
            sucessCB(result);
        }
    );
}

module.exports = {
    getAllBoxQuestions: getAllBoxQuestions,
    getQuestions: getQuestions,
    insertPendindData: insertPendindData,
    createNewQuestions: createNewQuestions,
    createNewQuestionColln: createNewQuestionColln,
    updateQuestion: updateQuestion,
    setClosedStatusQuestion : setClosedStatusQuestion
};
