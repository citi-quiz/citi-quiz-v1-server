const Pig = require("pigcolor");
const Test = require("../modules/test");
const { v4: uuidv4 } = require("uuid");
const Question = require("../modules/question");
const User = require("../modules/user");
const SubCategory = require("../modules/setcategory");

// TODO:
exports.initializeTest = async (req, res) => {
  Pig.box("Initialize: Test");
  console.log("res.body - ", req.body);
  const SCORE_VALUE = 1;
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

  Question.find()
    .where("_id")
    .in(questionIds)
    .then(async (questions, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      let score = 0;

      // ** Test Score Calculations Algorithm
      /** 
         * 
         * total score = totalQuestion * 5
        history = totalQuestion.history * 5 / totalHistory
        geography = totalQuestion.geography * 5
        politics = totalQuestion.politics * 5

        Test Result : Pass or Fail 
        
        **/

      const TOTAL_SCORE = questionSet.length * 5;

      let setCategory = [];
      let setCategoryCorrect = [];
      let setCategoryUnique = [];
      await questions.map((q, i) => {
        // console.log("q", q.questionAnswer[0].answerId);
        // console.log("a", answerIds[i].answerId);
        console.log("Question Sub Category - ", q.questionCategory);
        const isExist = setCategoryUnique.find(
          (set) => set === q.questionCategory
        );
        if (!isExist) setCategoryUnique.push(isExist);
        setCategory.push(q.questionCategory);
        if (q.questionAnswer[0].answerId === answerIds[i].answerId) {
          console.log("Scored");
          score = score + SCORE_VALUE;
          setCategoryCorrect.push(q.questionCategory);
        }
      });

      console.log("subCategory - ", setCategory);
      console.log("subCategory - ", setCategoryCorrect);
      // console.log("subCategory - ", setCategoryUnique);

      const TOTAL_PER = (score / TOTAL_SCORE) * 100;
      let TOTAL_RESULT = "";
      if (TOTAL_PER > 50) TOTAL_RESULT = "Pass";
      else TOTAL_RESULT = "Fail";
      console.log("Score - ", score);
      console.log("Total Score - ", TOTAL_SCORE);
      console.log("Total Percentage % - ", TOTAL_PER);
      console.log("Result Status - ", TOTAL_RESULT);

      newTest.setId = req.body.setId;
      newTest.userId = req.body.userId.value;
      newTest.questionId = req.body.questionId;
      newTest.score = score;
      newTest.rank = "0";
      newTest.result = TOTAL_RESULT;
      newTest.review = "Under Review";
      newTest.saved = true;
      console.log("before saving", score);
      newTest
        .save()
        .then((test, err) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          console.log("User Before", req.body.userId.value, err);
          User.findById({ _id: req.body.userId.value })
            .then((user, err) => {
              if (user) {
                user.tests.push(test._id);
                let user_score = 0;
                if (!user.totalScore) {
                  user_score = score;
                } else {
                  user_score = user.totalScore + score;
                }
                user.totalScore = user_score;
                user
                  .save()
                  .then((userScore, err) => {
                    if (err) {
                      return res.status(400).json({
                        error: err,
                      });
                    }

                    return res.json({
                      allTest: test,
                      questions: questions,
                      score: score,
                      user: userScore,
                      totalPer: TOTAL_PER,
                      result: TOTAL_RESULT,
                      totalScore: TOTAL_SCORE,
                    });
                  })
                  .catch((err) => {
                    return res.status(400).json({
                      error: err,
                    });
                  });
              }
            })
            .catch((err) => {
              return res.status(400).json({
                error: err,
              });
            });
        })
        .catch((err) => {
          return res.status(400).json({
            error: err,
          });
        });
    });
};

exports.getAllTests = (req, res) => {
  Pig.box("GET ALL: Tests");
  Test.find({})
    .then((test, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allTest: test,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getATest = (req, res) => {
  Pig.box("GET A: Test");
  Test.findById({ _id: req.params.testId })
    .then((test, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allTest: test,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getAllTests = (req, res) => {
  Pig.box("GET ALL: Tests");
  Test.find({})
    .then((test, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allTest: test,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};
