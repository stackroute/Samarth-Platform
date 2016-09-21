var qboxquestionModel = require('./qboxquestions');

function getQuestions(candidateid, sections, skip, limit, successCB, errorCB) {
    var findClause = { "candidateid": candidateid };
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
    var questionObj = new qboxquestions({
        candidateid: candidateId,
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        instancename: newquestionobj.instancename,
        response: newquestionobj.response,
        status: newquestionobj.status
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
    getQuestions: getQuestions,
    createNewQuestions: createNewQuestions,
};
