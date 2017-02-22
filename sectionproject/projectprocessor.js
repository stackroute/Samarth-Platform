let project = require('./projectschema');
let mongoose = require('mongoose');
let projectRelationBuilder = require('./projectRelationBuilder');

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
            return;
        }
        sucessCB(result);
    });
}
                                                        //, errorCB
function addProject(oldProjectObj, candidateId, successCB) {
    console.log("add project called");
    console.log("candidateId ...",candidateId);
    console.log("oldProjectObj ---", oldProjectObj);
    project.update({ candidateid: candidateId }, { $push: { projects: oldProjectObj.projects[0] } },
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
 
// delete project from MONGO and call NEO query to delete the relation bw the candidateid and project                                                        
function deleteProject(candidateId, projectName, successCB,errorCB) {

    if (mongoose.connection.readyState == 1) {
        
        project.update({ candidateid: candidateId }, {
        $pull: { projects: { name: projectName } }
    }, function() {
                        projectRelationBuilder.projectRelationDelete(candidateId,projectName,function(err, result) {

                                        if (result) {
                                                successCB('project object deleted');
                                        }

                                });
                        successCB('project object deleted');
                }
    );//end update

    } else {
        
        errorCB(err);
    }




    // project.update({ candidateid: candidateId }, {
    //     $pull: { projects: { name: projectName } }
    // }, function() {
        
    // });
}//deleteProject ends

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
            if (err) {
                errorCB(err);
            }
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
