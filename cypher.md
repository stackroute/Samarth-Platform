CREATE (p:Profession {name:"Front end Developer"})
FOREACH (skillName in ["Angular","React","HTML","CSS","Bootstrap"] |
  MERGE (p)-[:PRIMARY]->(s:Skill {name:skillName})
  CREATE (s)-[:USEDIN]->(p))


MATCH (p:Profession)-[r:PRIMARY]-(s:Skill) return p, r, s


MERGE (p:Profession {name:"Web Developer"})
FOREACH (skillName in ["Angular","React","HTML","CSS","Bootstrap"] |
  MERGE (s:Skill {name:skillName})
  MERGE (p)-[:PRIMARY]->(s)
  MERGE (s)-[:USEDIN]->(p))
  

MATCH (p:Profession)-[r:PRIMARY]-(s:Skill) return p, r, s

MATCH (p:Profession) DETACH DELETE 

(?i)

MATCH (p:Profession {name:"(?i)web developer"})-[r:PRIMARY]-(s:Skill) return p, r, s  


MATCH (n:Profession)
WHERE n.name =~ '(?i)weB deVeloPeR.*'
RETURN n

HTTP POST /professions/:nameofprofession/skills

HTTP POST /professions/Web Developer/skills
{
	profession: 'Web Developer',
	skills: ["Angular","React","HTML","CSS","Bootstrap"]
}


MERGE (p:Profession {name:"UI Developer"})
FOREACH (skillName in ["HTML","CSS","Bootstrap"] |
  MERGE (s:Skill {name:skillName})
  MERGE (p)-[:PRIMARY]->(s)
  MERGE (s)-[:USEDIN]->(p))

MATCH (p:Profession) where p.name =~ '(?i)weB deVeloPeR' MATCH (s:Skill) where s.name =~ '(?i)css' MATCH (p)-[r:PRIMARY]-(s) return p, r, s

