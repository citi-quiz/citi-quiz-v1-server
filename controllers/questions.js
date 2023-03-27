const Pig = require('pigcolor');
const Question = require('../modules/question');


exports.createQuestion = (req, res) => {
    Pig.box("CREATE: Question");
    const newQuestion = new Question();
    newQuestion.questionId = req.body.questionId;
    newQuestion.setUnder = req.body.setUnder;
    newQuestion.questionName = req.body.questionName;
    newQuestion.questionCategory = req.body.questionCategory;
    newQuestion.questionChoices = req.body.questionChoices;
    newQuestion.questionAnswer = req.body.questionAnswer;
    newQuestion.save()
        .then((question, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                question: question
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        })
}