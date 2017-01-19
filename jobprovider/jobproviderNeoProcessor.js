const neo4j = require('neo4j');
let neo4jConnection = require('../connections/neo4jconnection.js');
const db = neo4jConnection.getConnection();

registerJobProvider = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'merge (n:JobProvider{name:{jobcode}}) RETURN n ',
			params:{
				jobcode:req.jpCode
			}
		},
		function(err,result)
		{
			if(err)
			{
				errorCB(err);
			}
			else
			{
				successCB(result);
			}
		}
		)
	}
	catch(err)
	{
		console.log(err);
	}
}


module.exports = {
	registerJobProvider:registerJobProvider
}
