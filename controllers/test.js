const Pig = require('pigcolor');
const Test = require('../modules/test');
const { v4: uuidv4 } = require('uuid');
const Question = require('../modules/question');
const User = require('../modules/user');


// TODO: 
exports.initializeTest = async(req, res) => {
    Pig.box("Initialize: Test");
    console.log("res.body - ", req.body);
    const SCORE_VALUE = 5;
    // TODO: Login To Calculate Score and Verify Answers

    const newTest = new Test();
    newTest.testId = uuidv4();

    const testId = req.body.testId;
    const setId = req.body.setId;
    const userId = req.body.userId;
    const questionSet = req.body.questionId;


    const questionIds = [];
    const answerIds = [];
    // All Scores and Results
    const result = 0;
    const score = 0;


    await questionSet.map((set, i) => {
        // console.log("Question - ", set);
        questionIds.push(set.qid);
        answerIds.push(set.ansId);

        console.log("Question ID ", set.qid);
        console.log("Answer ID ", set.ansId);
    });


    let sortableQuestionSet = [];
    // answerIds.sort((a, b) => parseFloat(a.answerId) - parseFloat(b.answerId));
    // Here fix the sorting issue
    // console.log(answerIds);

    Question.find().where('_id').in(questionIds).then(async(questions, err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        let score = 0;
        await questions.map((q, i) => {
            console.log("q", q.questionAnswer[0].answerId);
            console.log("a", answerIds[i].answerId);
            if (q.questionAnswer[0].answerId === answerIds[i].answerId) {
                console.log("Scored");
                score = score + SCORE_VALUE;
            }
        });

        newTest.setId = req.body.setId;
        newTest.userId = req.body.userId.value;
        newTest.questionId = req.body.questionId;
        newTest.score = score;
        newTest.rank = "0";
        newTest.result = "Pass";
        newTest.review = "Under Review";
        newTest.saved = true;
        console.log("before saving", score);
        newTest.save().then((test, err) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }
                console.log("User Before", req.body.userId.value);
                User.findById({ _id: req.body.userId.value }).then((user, err) => {
                    if (user) {
                        user.tests.push(test._id);
                        let user_score = 0;
                        if (!user.totalScore) {
                            user_score = score;
                        } else {
                            user_score = user.totalScore + score;
                        }
                        user.totalScore = user_score;
                        user.save().then((userScore, err) => {
                            if (err) {
                                return res.status(400).json({
                                    error: err
                                })
                            }

                            return res.json({
                                allTest: test,
                                questions: questions,
                                score: score,
                                user: userScore
                            });


                        }).catch((err) => {
                            return res.status(400).json({
                                error: err
                            })
                        });
                    }
                }).catch((err) => {
                    return res.status(400).json({
                        error: err
                    })
                });

            })
            .catch((err) => {
                return res.status(400).json({
                    error: err
                })
            });


    });


};


exports.getAllTests = (req, res) => {
    Pig.box("GET ALL: Tests");
    Test.find({}).then((test, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allTest: test
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });;
}


exports.getATest = (req, res) => {
    Pig.box("GET A: Test");
    Test.findById({ _id: req.params.testId }).then((test, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allTest: test
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });;;
}


exports.getAllTests = (req, res) => {
    Pig.box("GET ALL: Tests");
    Test.find({}).then((test, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.json({
                allTest: test
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        });;;;
}