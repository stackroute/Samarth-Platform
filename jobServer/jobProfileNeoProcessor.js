let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();



createJobNode = function(job, res) {
    let query = "";
    query += 'MERGE (jb: Job{name:{jobCode},closedate:{closedate}}) ';
    query += 'MERGE (jp: JobProvider{name:{jpCode}}) ';
    query += 'MERGE (lc: Location{name:{location}}) ';
    query += 'MERGE (ex: Experience{name:{experience}}) ';  
    query += 'MERGE (rl: Role{name:{role}}) ';
    query += 'MERGE (jb)-[re:min_experience]->(ex)';
    query += 'MERGE (jb)-[r1:Providedby]->(jp)';
    query += 'MERGE (jb)-[r2:Available_At]->(lc) ';
    query += 'MERGE (jb)-[r3:Role_As]->(rl) ';
    query += 'FOREACH (skillname in {skills} | MERGE (sk: Skill{name:skillname.name}) ';
    query += 'MERGE (jb)-[r4:Required]->(sk) ) '; 
    query += 'FOREACH (prof in {profs} | MERGE (pf: Profession{name:prof}) ';  
    query += 'MERGE (jb)-[r5:belongs_to]->(pf) ) ';
    query += 'FOREACH (qualname in {quals} | MERGE (ql: Qualification{name:qualname.name}) ';
    query += 'MERGE (jb)-[r6:Expected]->(ql))'; 
    query += 'FOREACH (lang in {languages} | MERGE (lg: Language{name:lang.name}) ';
    query += 'MERGE (jb)-[r7:prefers_lang]->(lg))'; 


    let params = {
        jobCode: jobCode,
        jpCode: job.jpCode,
        location: job.desc.location,
        role: job.desc.role,
        languages:job.desc.languages,
        quals: job.criteria.qualifications,
        skills: job.desc.skills,
        profs: job.desc.profession,
        experience:job.desc.experience,
        closedate:new Date(job.desc.closedate).getTime()
    };

    console.log("Query for job profile indexing: ", query, " : ", params);

    db.cypher({
        query: query,
        params: params
    },
     function(err, results) {
        if (err) {
            console.log('Error in inserting relation in neo4j' + err);
        } else {
            console.log('Success in inserting neo4j....' + results);
        }
    });
};

getJobs = function(searchTxt,coordprofs, successres, errRes) {
    console.log("in neo get");
    let query="";
    let params={
                searchTxt: searchTxt,
                profs: coordprofs
    }
    // query="match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') match(j:Job)-[]-(n) match (j)-[r]-(p:Profession) where p.name in {profs} return distinct j.name as name";
    query+="match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') match(j:Job)-[rn]-(n) match (j)-[r]-(p:Profession) where p.name in {profs}";
    query+=" with collect(distinct{name:j.name, count:type(rn)}) as rows";
    query+=" optional match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') optional match";
    query+=" (n)-[rf]-(s) where type(rf) in ['goes_with','same-as','sub_role','similar_to','Same_As','SAME_AS','synonym_of'] optional match (s)-[rn]-(jb:Job) optional match(jb)-[r]-(pn:Profession)where pn.name in {profs}";
    query+=" with rows + collect(distinct{name:jb.name, count:type(rn)}) as allrows";
    query+=" unwind allrows as row with row.name as name , row.count as count return name, count(name) as count order by count desc";
    db.cypher({
            query:query,
            params:params
        },
        function(err, results) {
            if (err) {
                console.log(err);
            }else{
                console.log("in success neo");
            successres(results);
          }
        });
}

getJobsByProfession = function(prof, successres, errRes) {
    // console.log(prof);
    let query="";
    let params={};
    if(prof.indexOf('-') !== -1){
        console.log("if ");
        query='match(j:Job)-[r]-(p:Profession) where p.name in {prof} return distinct j.name as name';
        params.prof=prof.split('-');
    }else{
        console.log("else");
        query='match(j:Job)-[r]-(p:Profession {name:{prof}})return j.name as name';
        params.prof=prof;
    }
   db.cypher({
           query: query,
           params: params
       },
       function(err, results) {
           if (err) {
            // console.log('in neo err');
               console.log(err);
           }else{
               // console.log("in success neo");
           successres(results);
         }
       });
};

getIntent = function(searchTxt,coordprofs, successres, errRes) {
    console.log("in neo intent");
    let query="";
    let params={
                searchTxt: searchTxt,
                profs: coordprofs
    }
    // query="match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') match(j:Job)-[]-(n) match (j)-[r]-(p:Profession) where p.name in {profs} return distinct j.name as name";
    query+="match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') match(j:Job)-[rn]-(n) match (j)-[r]-(p:Profession) where p.name in {profs}";
    query+=" with collect(distinct{name:n.name,label:labels(n),rel:type(rn)}) as rows";
    query+=" match(n) where {searchTxt}=~('(?i).*'+n.name+'.*') match";
    query+=" (n)-[rf]-(s) where type(rf) in ['goes_with','same-as','sub_role','similar_to','Same_As','SAME_AS','synonym_of'] match (s)-[rn]-(jb:Job) match(jb)-[r]-(pn:Profession)where pn.name in {profs}";
    query+=" with rows + collect(distinct{name:n.name,label:labels(n),rel:type(rn)}) as allrows";
    query+=" unwind allrows as row";
    query+=" with row.name as name , row.label as label,row.rel as rel return distinct name, label, rel";
    db.cypher({
            query:query,
            params:params
        },
        function(err, results) {
            if (err) {
                console.log("in intent neo error");
            }else{
                console.log("in success neo intent");
            successres(results);
          }
        });
}

module.exports = {
    createJobNode: createJobNode,
    getJobs: getJobs,
    getJobsByProfession: getJobsByProfession,
    getIntent: getIntent
};
