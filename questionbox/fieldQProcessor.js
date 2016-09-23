var fieldQuestionsModel = require('./fieldquestions');

function getAllFieldQuestions(successCB, errorCB) {
    fieldQuestionsModel.find({}, { _id: 0, __v: 0 }, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
}


function getFieldQuestions(section, fieldNames, lang, successCB, errorCB) {
    var findClause = { "section": section };

    if (fieldNames.length > 0) {
        findClause['fieldname'] = { $in: fieldNames };
    }

    if (lang.length > 0) {
        findClause['lang'] = { $in: lang };
    }

    fieldQuestionsModel.find(findClause, { _id: 0, __v: 0 }, function(error, colln) {
        if (error) {
            errorCB(error);
        }
        successCB(colln);
    });
};

function createFieldQuestion(newquestionobj, sucessCB, errorCB) {
    console.log("Inside Field questons add processor", newquestionobj);
    var questionObj = new fieldQuestionsModel({
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        query: newquestionobj.query,
        lang: newquestionobj.lang,
    });

    questionObj.save(function(err, result) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        sucessCB(result);
    });
}

module.exports = {
    getFieldQuestions: getFieldQuestions,
    createFieldQuestion: createFieldQuestion,
    getAllFieldQuestions: getAllFieldQuestions
};
