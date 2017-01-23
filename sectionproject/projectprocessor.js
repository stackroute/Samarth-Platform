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
         // projects: formobj.projects.length!=0 ? formobj.projects : []
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
    console.log("add project called")
    project.update({ candidateid: candidateId }, { $push: { projects: oldProjectObj } },
        function(err) {
            if(err){
                console.log(err);
            }
            successCB(oldProjectObj, candidateId);
        }
    );
}
                                                                    // , errorCB
function updateProject(projectName, oldProjectObj, candidateId, successCB) {
    project.update({ candidateid: candidateId, 'projects.name': projectName }, {
            $set: {
                'projects.$.name': oldProjectObj.name,
                'projects.$.durationInMonths': oldProjectObj.durationInMonths,
                'projects.$.location': oldProjectObj.location,
                'projects.$.skills': oldProjectObj.skills,
                'projects.$.client': oldProjectObj.client,
                'projects.$.role': oldProjectObj.role,
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
