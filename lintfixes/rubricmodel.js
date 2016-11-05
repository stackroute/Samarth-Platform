let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*
rubric schema
*/

let rubricSchema = new Schema({
    scale: [String],
    type: [{
        name: String,
        columns: [{
            title: String,
            checklist: [String],
            desc: String,
            value: Number

        }],
        model: Number
    }]


});

let rubric = mongoose.model('rubricmodel', rubricSchema, 'profileRubric');
module.exports = rubric;


/*
{
   "scale" : [
                "Invalid",
                "Wrong",
                "Satisfactory",
                "Valid",
                "Rating"
        ],
        "type":[
          {
          "name":"Personal_Information",
          "colums":[{
             "title" : "Invalid",
             "checklist":["Invalid Date of Birth","Invalid Mobile Number","Invalid Address"],
             "desc" : "The phone number and email address is invalid",
            "value":0

          },
          { "title" : "Wrong",
          "checklist":["Wrong Mobile Number","The address is wrong","Location does'nt match the address"],
            "desc" : "The given address is wrong",
            "value" : 1


          },{"title" : "Satisfactory",
          "checklist":["Information provided is correct","Information needs more clarification"],
            "desc" : "The profile is correct but it needs more information",
            "value" : 3

          },
            {"title" : "Valid",
            "checklist":["Valid Contact Number","Valid email address","Valid location and pin code"],
            "desc" : "The location and address matched,phone number and mail address are valid",
            "value" : 5

            }],
            "model":0

        },
         {
          "name":"Skills",
          "colums":[{
             "title" : "Invalid",
             "checklist":["Invalid skill name","The expertise level is invalid","Invalid profession for the skill"],
            "desc" : "The skills written does not match the profession",
            "value":0

          },
          { "title" : "Wrong",
            "checklist":["Wrong skill against profession","Wrong category of skill","Wrong skill type"],
            "desc" : "The primary skills are not correct",
            "value":1


          },{"title" : "Satisfactory",
            "checklist":["Details are correct but incomplete","Not all information provided","Primary Skills mentioned"],
            "desc" : "The primaryskills are there but secondary skill not mention",
            "value":3

          },
            {"title" : "Valid",
            "checklist":["Valid skill name","Skills have correct relation with profession","Valid expertise level"],
            "desc" : "The primary and secondary skill are matched with profession ",
            "value":5

            }],
            "model":0

        }, {
          "name":"Qualification",
          "colums":[{
             "title" : "Invalid",
             "checklist":["Invalid institute name","Invalid batch details","Invalid address of institutes"],

            "desc" : "There is no such qualification exsist",
            "value":0

          },
          { "title" : "Wrong",
          "checklist":["Wrong details entered","Wrong institution name","Wrong data about institute"],
            "desc" : "The mention qualification is not correct ",
            "value":1


          },{"title" : "Satisfactory",
            "checklist":["Some information is missing","Most of the data is correct","A satisfactory profile"],
            "desc" : "The school or college is correct but year is not mention ",
            "value":3

          },
            {"title" : "Valid",
            "checklist":["All valid information","Valid batch details","Correctly filled details"],
            "desc" : "The school or college is matched ",
            "value":5

            }],
            "model":0

        }, {
          "name":"Project",
          "colums":[{
             "title" : "Invalid",
            "desc" : "The project do not matched with the skills given",
            "value":0

          },
          { "title" : "Worng",
            "desc" : "The salary mention is worng",
            "value":1


          },{"title" : "Satisfactory",
            "desc" : "The project details are correct but need some improvements",
            "value":3

          },
            {"title" : "Valid",
            "desc" : "All the details are correct ",
            "value":5

            }],
            "model":0

        },{
          "name":"Work History",
          "colums":[{
             "title" : "Invalid",
            "desc" : "The company does not exisit",
            "value":0

          },
          { "title" : "Worng",
            "desc" : "The duration mention was worng and the desigination no relation with profession",
            "value":1


          },{"title" : "Satisfactory",
            "desc" : "The details are correct and requires some more clarification  ",
            "value":3

          },
            {"title" : "Valid",
            "desc" : "The mentions details are correct",
            "value":5

            }],
            "model":0

        }
        ]


}


*/
