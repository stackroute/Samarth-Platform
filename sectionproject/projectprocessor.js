var project = require('./projectschema');

function getProject(candidateId, successCB, errorCB) {
    project.find({ "candidateid": candidateId }, 'projects', function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }

        console.log("Inside get Project Function" + result);
        successCB(result);
    });
};

function findAllProject(successCB, errorCB) {
    var projectsMap = {};
    project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        projects.forEach(function(result) {
            projectsMap[result._id] = result;
        });
        console.log(projects);
        successCB(projects);
    });
};

function createNewProject(newprojectobj, candidateId, sucessCB, errorCB) {
    var projectObj = new project({
        candidateid:candidateId,
        projects: []
    });
    projectObj.projects.push(newprojectobj.projects[0]);
    console.log("inside createNewProject:");

    projectObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log('New Project created', result);
        sucessCB(result);

    });
}

function modifyProject(oldProjectObj, candidateId, successCB, errorCB) {
    
    project.update({ "candidateid": candidateId }, { $push: { "projects": oldProjectObj.projects[0] } },
        function() {
            successCB("project added")

        }
    );
};

function updateProject(projectName,oldProjectObj, candidateId, successCB, errorCB) {
    console.log("Inside update of project")
    project.update({ 'candidateid': candidateId, 'projects.name': projectName }, {
            '$set': {
                'projects.$.name': oldProjectObj.records[0].name,
                'projects.$.workplace': oldProjectObj.records[0].workplace,
                'projects.$.location': oldProjectObj.records[0].location,
                'projects.$.income': oldProjectObj.records[0].income,
                'projects.$.duration.from': oldProjectObj.records[0].duration.from,
                'projects.$.duration.to': oldProjectObj.records[0].duration.to,
                'projects.$.duration.duration': oldProjectObj.records[0].duration.duration
            }
        },

        function() {
            successCB("project updated");
        }
    );

};

function deleteProject(candidateId, projectName, successCB, errorCB) {

    project.update({ 'candidateid': candidateId }, {
        $pull: { 'projects': { 'name': projectName } }
    }, function() {
        successCB("project object deleted")
    });
};

module.exports = {
    getProject: getProject,
    findAllProject: findAllProject,
    modifyProject:modifyProject,
    createNewProject: createNewProject,
    updateProject: updateProject,
    deleteProject: deleteProject
};
