let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let qualificationSchema = new Schema({
  candidateid: {type: String, required: true},
  qualification: [
  {
  	title: {type: String, required: true}, // title of my qualification that i have done
  	batch: {type: Number, required: true},		   // the year in which i had passed
  	from: {type: String},
  	to: {type: String},
  	academicType: {type: String},							// whether primary,secondary,college etc
  	institute: {
  		name: {type: String, required:true},//name of the institute from where qualification attained
  		type: {type: String, enum: ['school', 'work', 'college']},
  		location: {type: String},						// location of institute
  		affiliation: {type: String},/* Board name if a school, University name 
                                                    if a college etc */
  		metadata: []
  	},
  	outcome: {
		result: {type: String},							// marks;grades eg A,B;etc
		unit: {type: String}							// %, GRADE , NUMBER etc
	}
  }]
});

let qualificationModel = mongoose.model('qualificationModel',qualificationSchema,'qualifications');
module.exports = qualificationModel;
// module.exports=mongoose;
