const Pig = require('pigcolor');
const Question = require('../modules/question');
const User = require('../modules/user');
const { v4: uuidv4 } = require('uuid');


exports.createQuestion = (req, res) => {
    Pig.box("CREATE: Question");
    console.log(req.body);
    const newQuestion = new Question();
    newQuestion.questionId = uuidv4();
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

exports.getAllQuestions = (req, res) => {
    Pig.box("GET ALL: Questions");
    Question.find({}).then((allquestion, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allquestion: allquestion
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });
}

exports.getAQuestion = (req, res) => {
    Pig.box("GET A: Question");
    Question.findById({ _id: req.params.qId }).then((aquestion, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allquestion: aquestion
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });

}


// TODO: All Mail Queries Here

exports.getQuestionsAllInSet = (req, res) => {
    Pig.box("GET ALL: Questions Under Sets");
    Question.find({ setUnder: req.params.setId })
        .then((question, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allquestion: question
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });

}

exports.getQuestionAsSet = (req, res) => {
    Pig.box("GET ALL: Generate Question ");


    const setId = req.params.setId;
    console.log("SetID - ", setId);
    var random = Math.ceil(Math.random() * (13 - 1) + 1);
    Question.find({ setUnder: setId }).skip(random).limit(5)
        .then((question, err) => {
            console.log(question);
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allquestion: question
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });

}


exports.getQuestionEvaluate = () => {
    Pig.box("GET: Evaluated Questions");

}


// ***************** Special APIs (Featured) *********************


exports.addQuestionToFavroits = (req, res) => {
    Pig.box("ADD: Question To Fav");
    console.log("Question Fav - ", req.body);
    const questionId = req.body.questionId;
    const userId = req.body.userId.value;
    User.findOne({ _id: userId }).then((user, err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        const isQuestionExist = user.favorites.filter(q => q === questionId);
        console.log(isQuestionExist);
        if (isQuestionExist.length < 1) {
            user.favorites.push(questionId);
            user.save().then((quser, err) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                return res.json({
                    user: quser
                })
            })
        } else {
            return res.json({
                msg: "Already in Fav"
            })
        }

    });
}