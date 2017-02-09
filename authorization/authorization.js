
var  RBAC = require('rbac').default;

const rbac = new RBAC({
  roles: ['admin', 'coordinator', 'supervisor', 'candidate'],
  permissions: {
    sidenavbar:['read'],
    search: ['create', 'read', 'edit', 'delete'],
    jobs: ['create', 'read', 'edit', 'delete'],
    admins: ['create', 'read', 'edit', 'delete'],
    supervisors: ['create', 'read', 'edit', 'delete'],
    candidates: ['create', 'read', 'edit', 'delete'],
    jobprovider:['create', 'read', 'edit', 'delete'],
    // jobpost:['create', 'read', 'edit', 'delete'],

    imports:['create'],
    personalinfo :['create', 'read', 'edit', 'delete'],
    jobpreferences:['create', 'read', 'edit', 'delete'],
    education:['create', 'read', 'edit', 'delete'],
    skills:['create', 'read', 'edit', 'delete'],
    workexperience:['create', 'read', 'edit', 'delete'],
    gallery:['create', 'read', 'edit', 'delete'],
    projects:['create', 'read', 'edit', 'delete'],
    coordinators:['create', 'read', 'edit', 'delete'],
    coordinatorusers:['create', 'read', 'edit', 'delete'],
    centerdetails:['create', 'read', 'edit', 'delete'],
    skillcard : ['create', 'read', 'edit', 'delete'],
    reports : ['create', 'read', 'edit', 'delete'],
    searchcandidate : ['create', 'read', 'edit', 'delete']
   },
  grants: {
    candidate : ['create_personalinfo','edit_personalinfo','read_personalinfo',
                'create_jobpreferences','edit_jobpreferences','read_jobpreferences',
                'create_education','edit_education','read_education','delete_education',
                'create_skills','edit_skills','read_skills','delete_skills',
                'create_workexperience','edit_workexperience','read_workexperience','delete_workexperience',
                'create_projects','edit_projects','read_projects','delete_projects','read_jobs',
                'read_centerdetails',
                'create_skillcard','read_skillcard','edit_skillcard','delete_skillcard',
                'create_gallery','read_gallery','edit_gallery','delete_gallery',
              'create_jobprovider','edit_jobprovider','read_jobprovider'],

    // supervisor: ['read_sidenavbar','create_jobs', 'read_jobs','create_jobs','edit_jobs', 'delete_jobs'],

    coordinator: ['read_sidenavbar', 'create_jobs', 'read_jobs', 'edit_jobs', 'delete_jobs',
                  'create_reports', 'read_reports', 'edit_reports', 'delete_reports',
                  // 'create_jobpost', 'read_jobpost', 'edit_jobpost', 'delete_jobpost',
                  'create_candidates','edit_candidates','read_candidates',
                  'create_jobprovider','edit_jobprovider',,'read_jobprovider','read_search',
                  'create_personalinfo','edit_personalinfo','read_personalinfo',
                  'create_jobpreferences','edit_jobpreferences','read_jobpreferences',
                  'create_education','edit_education','read_education','delete_education',
                  'create_skills','edit_skills','read_skills','delete_skills',
                  'create_workexperience','edit_workexperience','read_workexperience','delete_workexperience',
                  'create_projects','edit_projects','read_projects','read_jobs',
                    'create_searchcandidate','read_searchcandidate','read_gallery',
                    'create_centerdetails','read_centerdetails','edit_centerdetails'],

    admin: ['read_sidenavbar','create_coordinators', 'read_coordinators', 'edit_coordinators', 'delete_coordinators',
            'create_admins', 'read_admins', 'edit_admins', 'delete_admins',
            'create_supervisors', 'read_supervisors', 'edit_supervisors', 'delete_supervisors',
            'create_centerdetails','read_centerdetails','edit_centerdetails','delete_centerdetails',
            'create_imports','create_searchcandidate','read_searchcandidate']



  }
}, function(err, rbacInstance) {
  if (err) {
    throw err;
  }
});

function isAuthorized(req, res, next, role, accesslevel, target){
    rbac.can(role, accesslevel, target, (err, can) => {
      // console.log(role);
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
  }
});
}

module.exports = {
  isAuthorized : isAuthorized
}
