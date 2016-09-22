var fieldQuestionsModel = require('./fieldquestions');

function getFieldQuestions(section, fieldNames, lang, successCB, dataCB, errorCB) {
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
        dataCB(colln);
    });
};

function createFieldQuestion(newquestionobj, sucessCB, errorCB) {

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
    createFieldQuestion: createFieldQuestion
};
