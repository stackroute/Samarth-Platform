var  RBAC = require('rbac').default;

const rbac = new RBAC({
  roles: ['admin', 'coordinator', 'supervisor', 'candidate'],
  permissions: {
    sidenavbar:['read'],
    jobs: ['create', 'read', 'edit', 'delete'],
    admin: ['create', 'read', 'edit', 'delete'],
    supervisor: ['create', 'read', 'edit', 'delete'],
    candidate: ['create', 'read', 'edit', 'delete'],
    coordinator: ['create', 'read', 'edit', 'delete'],
    personalinfo :['create', 'read', 'edit', 'delete'],
    jobpreferences:['create', 'read', 'edit', 'delete'],
    education:['create', 'read', 'edit', 'delete'],
    skills:['create', 'read', 'edit', 'delete'],
    workexperience:['create', 'read', 'edit', 'delete'],
    projects:['create', 'read', 'edit', 'delete'],
    jobprovider:['create', 'read', 'edit', 'delete']

  },
  grants: {

    supervisor: ['read_sidenavbar','create_jobs', 'read_jobs','create_jobs','edit_jobs', 'delete_jobs'],
    coordinator: ['read_sidenavbar', 'create_jobs', 'read_jobs', 'edit_jobs', 'delete_jobs'],
     admin: ['create_admin','create_coordinator', 'read_coordinator', 'edit_coordinator', 'delete_coordinator',
             'create_supervisor','read_supervisor','edit_supervisor','delete_supervisor'],
  candidate : ['create_personalinfo','edit_personalinfo','read_personalinfo',
                'create_jobpreferences','edit_jobpreferences','read_jobpreferences',
                'create_education','edit_education','read_education','delete_education',
                'create_skills','edit_skills','read_skills','delete_skills',
                'create_workexperience','edit_workexperience','read_workexperience','delete_workexperience',
                'create_projects','edit_projects','read_projects','read_jobs']

 }
}, function(err, rbacInstance) {
  if (err) {
    throw err;
  }
});

function isAuthorized(req, res, next, role, accesslevel, target){
  // console.log(req.decoded);
  rbac.can(role, accesslevel, target, (err, can) => {

 if (err) {
    console.log("Not authorized");
    // throw err; // process error
    // res.send(err);
    return false;
  }

 if (can) {
    console.log('coordinator is able create jobs');
    next();
  } else {
    console.log("Not authorized");
    res.status(403).send("Not authorized");
    // res.status(403).redirect('/');
  }
});
}

module.exports = {
  isAuthorized : isAuthorized
}