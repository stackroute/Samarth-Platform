let rubric = require('./rubricmodel');

// The rubric processor
function getrubric(typename, successCB, errorCB) {
  //  console.log(typename);
    rubric.find({ 'type.name': typename }, { type: { $elemMatch: { name: typename } }, scale: 1 },
        function(error, result) {
            if (error) {
                errorCB(error);
            }


            successCB(result);
        });
}

module.exports = {
    getrubric: getrubric
};
