var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var qualificationSchema = new Schema({
  qualification:[
  {
  	title:{type:String,required:true}, //title of my qualification that i have done
  	batch:{type: Number, required:true},		   // the year in which i had passed
  	from:{type:String},
  	to:{type:String},
  	academicType:{type:String},							//whether primary,secondary,college etc
  	institute:{
  		name:{type: String, required:true},				//name of the institute from where qualification attained
  		type:{type: String, required:true,enum:['school','work','college']},	
  		location:{type: String, required:true},						//location of institute
  		affiliation:{type: String, required:true},					//Board name if a school, University name if a college etc 
  		metadata:[]
  	},
  	outcome: {		
		result:{type:String,required:true},							//marks;grades eg A,B;etc
		unit:{type:String,required:true}							//%, GRADE , NUMBER etc
	}
  }] 
});

var qualificationModel=mongoose.model('qualificationModel',qualificationSchema,'profiles');
module.exports=qualificationModel;
// module.exports=mongoose;