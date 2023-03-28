const Pig = require('pigcolor');
const Test = require('../modules/test');
const { v4: uuidv4 } = require('uuid');



exports.initializeTest = (req, res) => {
    Pig.box("Initialize: Test");
    const userId = req.body.userId;
    const newTest = new Test();
    newTest.testId = uuidv4();
    newTest.setId = req.body.setId;
    newTest.userId = req.body.userId;
    newTest.questionId = req.body.questionId;
    newTest.score = "0";
    newTest.rank = "0";
    newTest.result = "Init";
    newTest.review = "Under Review";
    newTest.save = true;
    newTest.save().then((test, err) => {
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
        });


};


exports.getAllTests = (req, res) => {
    Pig.box("GET ALL: Tests");
}


exports.getATest = (req, res) => {
    Pig.box("GET A: Test");
}