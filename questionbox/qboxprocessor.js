var fieldquestions = require('./fieldquestions');
var qboxquestionModel = require('./qboxquestions');

function getQuestions(candidateid, sections, skip, limit, successCB, errorCB) {
    var findClause = { "candidateid": candidateid };
    var pagination = { skip: parseInt(skip), limit: parseInt(limit) };

    console.log("Section length ", sections.length, " sections: ", sections);
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

function getquestionsFromSections(candidateId, section, successCB, errorCB) {

    qboxquestions.find({ "candidateid": candidateId }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }
        successCB(result);
    });

};

function getquestions(candidateId, section, successCB, errorCB) {

    qboxquestions.find({ "candidateid": candidateId }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }
        console.log("Inside questions get function")
        successCB(result);
    });

};

function getfieldquestions(section, lang, successCB, errorCB) {
    console.log("Inside fieldquestions get function");
    fieldquestions.find({ "section": section, "lang": lang }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }
        console.log("result coming");

        successCB(result);
    });

};

function getAllfieldquestions(lang, successCB, errorCB) {
    console.log("Inside fieldquestions get function");
    fieldquestions.find({ "lang": lang }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }
        console.log("result coming");

        successCB(result);
    });

};

function createNewQuestions(newquestionobj, candidateId, sucessCB, errorCB) {
    var questionObj = new qboxquestions({
        candidateid: candidateId,
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        instancename: newquestionobj.instancename,
        response: newquestionobj.response,
        status: newquestionobj.status

    });

    console.log("inside createQuestionsect:");

    questionObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        sucessCB(result);

    });
}

function createNewFieldQuesn(newquestionobj, sucessCB, errorCB) {
    var questionObj = new fieldquestions({
        section: newquestionobj.section,
        fieldname: newquestionobj.fieldname,
        query: newquestionobj.query,
        lang: newquestionobj.lang,

    });

    console.log("inside createQuestionsect:");

    questionObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        sucessCB(result);

    });
}

module.exports = {
    getquestions: getquestions,
    getQuestions: getQuestions,
    createNewQuestions: createNewQuestions,
    getfieldquestions: getfieldquestions,
    getAllfieldquestions: getAllfieldquestions,
    createNewFieldQuesn: createNewFieldQuesn

};
