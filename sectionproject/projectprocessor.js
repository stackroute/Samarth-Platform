let project = require('./projectschema');

function getProject(candidateId, successCB, errorCB) {
    project.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            errorCB(error); 
        }
        successCB(result);
    });
} 
  
function findAllProject(successCB, errorCB) {
    let projectsMap = {};
    project.find({}, function(err, projects) {
        if (err) {
            errorCB(err);
        }
        projects.forEach(function(result) {
            projectsMap[result._id] = result;
        });
        successCB(projects);
    });
}

function createNewProject(formobj, sucessCB, errorCB) {
    let projectObj = new project({
        candidateid: formobj.mobile,
        projects: []
    });
    projectObj.save(function(err, result) {
        if (err) {
            errorCB(err);
        }
        sucessCB(result);
    });
}
                                                        //, errorCB
function addProject(oldProjectObj, candidateId, successCB) {
    project.update({ candidateid: candidateId }, { $push: { projects: oldProjectObj.projects[0] } },
        function() {
            successCB('project added');
        }
    );
}
                                                                    // , errorCB
function updateProject(projectName, oldProjectObj, candidateId, successCB) {
    project.update({ candidateid: candidateId, 'projects.name': projectName }, {
            $set: {
                'projects.$.name': oldProjectObj.projects[0].name,
                'projects.$.workplace': oldProjectObj.projects[0].workplace,
                'projects.$.location': oldProjectObj.projects[0].location,
                'projects.$.income': oldProjectObj.projects[0].income,
                'projects.$.duration.from': oldProjectObj.projects[0].duration.from,
                'projects.$.duration.to': oldProjectObj.projects[0].duration.to,
                'projects.$.duration.durationInMonths': oldProjectObj.projects[0].duration.durationInMonths,
                'projects.$.skills': oldProjectObj.projects[0].skills
            }
        },

        function() {
            successCB('project updated');
        }
    );
}
                                                        //, errorCB
function deleteProject(candidateId, projectName, successCB) {
    project.update({ candidateid: candidateId }, {
        $pull: { projects: { name: projectName } }
    }, function() {
        successCB('project object deleted');
    });
}

//add project details after  entering into the question box into the existing records
function addMissingProjectFieldResponse(candidateid, projectInstanceName, fieldname, response, successCB, errorCB) {
   // console.log("------->"+skillInstanceName+"   "+fieldname+"  "+response);
    let field = ('projects.$.' + fieldname);
    let setObj = {};
    setObj[field] = response;
    console.log("------>under projects------------>"+field);
    project.update({
            candidateid: candidateid,
            'projects.name': projectInstanceName
        }, {
            $set: setObj
        },
        function(err, result) {
            if (err) {}
            successCB(result)
        }

    );
}

module.exports = {
    getProject: getProject,
    findAllProject: findAllProject,
    addProject: addProject,
    createNewProject: createNewProject,
    updateProject: updateProject,
    deleteProject: deleteProject,
    addMissingProjectFieldResponse: addMissingProjectFieldResponse
};
