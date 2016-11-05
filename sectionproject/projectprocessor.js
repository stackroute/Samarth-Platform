let project = require('./projectschema');

function getProject(candidateId, successCB, errorCB) {
    project.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
           // console.log(error);
            errorCB(error);
        }

       // console.log('Inside get Project Function' + result);
        successCB(result);
    });
}

function findAllProject(successCB, errorCB) {
    let projectsMap = {};
    project.find({}, function(err, projects) {
        if (err) {
          //  console.log(err);
            errorCB(err);
        }
        projects.forEach(function(result) {
            projectsMap[result._id] = result;
        });
       // console.log(projects);
        successCB(projects);
    });
}

function createNewProject(formobj, sucessCB, errorCB) {
    let projectObj = new project({
        candidateid: formobj.mobile,
        projects: []
    });
    // skillObj.skills.push(newskillobj.skills[0]);
   // console.log('About to save new project:', projectObj);
    projectObj.save(function(err, result) {
       // console.log('inside save');
        if (err) {
           // console.log(err);
            errorCB(err);
        }
       // console.log('New project created', result);
        sucessCB(result);
    });
}

function addProject(oldProjectObj, candidateId, successCB, errorCB) {
    project.update({ candidateid: candidateId }, { $push: { projects: oldProjectObj.projects[0] } },
        function() {
            successCB('project added');
        }
    );
}

function updateProject(projectName, oldProjectObj, candidateId, successCB, errorCB) {
   // console.log('Inside update of project');
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

function deleteProject(candidateId, projectName, successCB, errorCB) {
    project.update({ candidateid: candidateId }, {
        $pull: { projects: { name: projectName } }
    }, function() {
        successCB('project object deleted');
    });
}

module.exports = {
    getProject: getProject,
    findAllProject: findAllProject,
    addProject: addProject,
    createNewProject: createNewProject,
    updateProject: updateProject,
    deleteProject: deleteProject
};
