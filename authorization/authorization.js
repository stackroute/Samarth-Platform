
var  RBAC = require('rbac').default;

const rbac = new RBAC({
  roles: ['admin', 'coordinator', 'supervisor', 'candidate'],
  permissions: {
    sidenavbar:['read'],
    search: ['create', 'read', 'edit', 'delete'],
    jobs: ['create', 'read', 'edit', 'delete'],
    admin: ['create', 'read', 'edit', 'delete'],
    supervisor: ['create', 'read', 'edit', 'delete'],
    candidate: ['create', 'read', 'edit', 'delete'],
    coordinator: ['create', 'read', 'edit', 'delete'],
    jobprovider:['create', 'read', 'edit', 'delete'],
    // rbac:['update'],
    personalinfo :['create', 'read', 'edit', 'delete'],
    jobpreferences:['create', 'read', 'edit', 'delete'],
    education:['create', 'read', 'edit', 'delete'],
    skills:['create', 'read', 'edit', 'delete'],
    workexperience:['create', 'read', 'edit', 'delete'],
    projects:['create', 'read', 'edit', 'delete'],
    coordinators:['create', 'read', 'edit', 'delete'],
    coordinatorusers:['create', 'read', 'edit', 'delete'],
    centerdetails:['create', 'read', 'edit', 'delete']
   },
  grants: {
    candidate : ['create_personalinfo','edit_personalinfo','read_personalinfo',
                'create_jobpreferences','edit_jobpreferences','read_jobpreferences',
                'create_education','edit_education','read_education','delete_education',
                'create_skills','edit_skills','read_skills','delete_skills',
                'create_workexperience','edit_workexperience','read_workexperience','delete_workexperience',
                'create_projects','edit_projects','read_projects','read_jobs'],

    // supervisor: ['read_sidenavbar','create_jobs', 'read_jobs','create_jobs','edit_jobs', 'delete_jobs'],

    coordinator: ['read_sidenavbar', 'create_jobs', 'read_jobs', 'edit_jobs', 'delete_jobs',
                  'create_candidate','edit_candidate','read_candidate',
                  'create_jobprovider','edit_jobprovider','read_search'],

    admin: ['read_sidenavbar','create_coordinators', 'read_coordinators', 'edit_coordinators', 'delete_coordinators',
            'create_admin', 'read_admin', 'edit_admin', 'delete_admin',
            'create_supervisor', 'read_supervisor', 'edit_supervisor', 'delete_supervisor',
            'create_centerdetails','read_centerdetails','edit_centerdetails','delete_centerdetails']



  }
}, function(err, rbacInstance) {
  if (err) {
    throw err;
  }
});

function isAuthorized(req, res, next, role, accesslevel, target){
    rbac.can(role, accesslevel, target, (err, can) => {
  if (err) {

    console.log("Not authorized");
    // throw err; // process error
    // res.send(err);
    return false;
  }

  if (can) {
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
