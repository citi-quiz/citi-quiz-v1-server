const Pig = require("pigcolor");
const Question = require("../modules/question");
const User = require("../modules/user");
const Bookmark = require("../modules/bookmark");
const { v4: uuidv4 } = require("uuid");
const { propfind } = require("../routers/admin");

exports.createQuestion = (req, res) => {
  Pig.box("CREATE: Question");
  const newQuestion = new Question();
  newQuestion.questionId = uuidv4();
  newQuestion.setUnder = req.body.setUnder;
  newQuestion.questionName = req.body.questionName;
  newQuestion.questionCategory = req.body.questionCategory;
  newQuestion.questionDescription = req.body.questionDescription;
  newQuestion.questionImpLink = req.body.questionImpLink;
  newQuestion.questionChoices = req.body.questionChoices;
  newQuestion.questionAnswer = req.body.questionAnswer;
  newQuestion
    .save()
    .then((question, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        question: question,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.deleteQuestion = (req, res) => {
  Pig.box("DELETE: Question");
  const questionId = req.body.questionId;
  console.log(req.body);
  Question.findByIdAndDelete({ _id: questionId })
    .then((question, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (question) {
        return res.json({
          question: question,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.updateQuestion = (req, res) => {
  Pig.box("UPDATE: Question");
  console.log(req.body);
  Question.findById({ _id: req.body.qId }).then((question, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!question)
      return res.json({
        msg: "No Question Exist",
      });
    question.questionId = uuidv4();
    question.setUnder = req.body.setUnder;
    question.questionName = req.body.questionName;
    question.questionCategory = req.body.questionCategory;
    question.questionDescription = req.body.questionDescription;
    question.questionImpLink = req.body.questionImpLink;
    question.questionChoices = req.body.questionChoices;
    question.questionAnswer = req.body.questionAnswer;
    question.save().then((updatedQuestion, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (updatedQuestion)
        return res.json({
          question: updatedQuestion,
        });
    });
  });
};

exports.getAllQuestions = (req, res) => {
  Pig.box("GET ALL: Questions");
  Question.find({})
    .then((allquestion, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allquestion: allquestion,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getAQuestion = (req, res) => {
  Pig.box("GET A: Question");
  Question.findById({ _id: req.params.qId })
    .then((aquestion, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allquestion: aquestion,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

// TODO: All Mail Queries Here

exports.getQuestionsAllInSet = (req, res) => {
  Pig.box("GET ALL: Questions Under Sets");
  Question.find({ setUnder: req.params.setId })
    .then((question, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allquestion: question,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getQuestionAsSetIndexBased = (req, res) => {
  Pig.box("GET ALL: Generate Question By Limit");

  const setId = req.params.setId;
  const Ind = req.params.ind;
  console.log("SetID - ", setId, Ind);
  Question.find({ setUnder: setId })
    .skip(Ind - 6)
    // .limit()
    .then((question, err) => {
      console.log(question);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allquestion: question,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getQuestionAsSet = (req, res) => {
  Pig.box("GET ALL: Generate Question ");

  const setId = req.params.setId;
  console.log("SetID - ", setId);
  var random = Math.ceil(Math.random() * (2 - 1) + 1);
  Question.find({ setUnder: setId })
    .skip(0)
    .then((question, err) => {
      console.log(question);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        allquestion: question,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getQuestionEvaluate = () => {
  Pig.box("GET: Evaluated Questions");
};

// ***************** Special APIs (Featured) *********************

exports.addQuestionToFavroits = (req, res) => {
  Pig.box("ADD: Question To Fav");
  console.log("Question Fav - ", req.body);
  const questionId = req.body.questionId;
  const userId = req.body.userId.value;
  User.findOne({ _id: userId }).then((user, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const isQuestionExist = user.favorites.filter((q) => q === questionId);
    console.log(isQuestionExist);
    if (isQuestionExist.length < 1) {
      user.favorites.push(questionId);
      user.save().then((quser, err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.json({
          user: quser,
        });
      });
    } else {
      return res.json({
        msg: "Already in Fav",
      });
    }
  });
};

exports.removeQuestionToFavroits = (req, res) => {
  Pig.box("REMOVE: Question To Fav");
  const questionId = req.body.questionId;
  const userId = req.body.userId.value;
  User.findOne({ _id: userId }).then((user, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const isQuestionExist = user.favorites.filter((q) => q === questionId);
    const isQuestionExistIndex = user.favorites.findIndex(
      (q) => q === questionId
    );

    // console.log('isQuestionExist remove     -> ', isQuestionExist);
    // console.log('isQuestionExist Index remove     -> ', isQuestionExistIndex);

    const userFav = user.favorites;
    console.log(userFav);
    userFav.splice(isQuestionExistIndex, 1);
    console.log(userFav);
    user.favorites = userFav;
    user.save().then((quser, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        user: quser,
      });
    });
  });
};

exports.getAllFavQuestions = (req, res) => {
  Pig.box("GET ALL: Favorite Questions");
  const userId = req.params.userId;
  User.findById({ _id: userId })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      Question.find()
        .where("_id")
        .in(user.favorites)
        .exec()
        .then((favQuestions) => {
          return res.json({
            favQuestions: favQuestions,
          });
        });
    })
    .catch((err) => {
      return res.json({
        error: err,
      });
    });
};

exports.getAllFavQuestionsUderSet = (req, res) => {
  Pig.box("GET ALL: Fav Question User Set");
  const userId = req.params.userId;
  const setUnderId = req.params.setId;
  console.log(req.params);
  User.findById({ _id: userId })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      Question.find({ setUnder: setUnderId })
        .where("_id")
        .in(user.favorites)
        .exec()
        .then((favQuestions) => {
          return res.json({
            favQuestions: favQuestions,
          });
        });
    })
    .catch((err) => {
      return res.json({
        error: err,
      });
    });
};

exports.getAllBookmarkQuestions = (req, res) => {
  Pig.box("GET ALL: Bookmark Questions");
  const userId = req.params.userId;
  User.findById({ _id: userId })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      Question.find()
        .where("_id")
        .in(user.bookmarks)
        .exec()
        .then((favQuestions) => {
          return res.json({
            favQuestions: favQuestions,
          });
        });
    })
    .catch((err) => {
      return res.json({
        error: err,
      });
    });
};

exports.addQuestionToBookmark = (req, res) => {
  Pig.box("ADD: Question to Bookmark");
  const questionId = req.body.questionId;
  const userId = req.body.userId.value;
  const bookmarkIndex = req.body.bookbarkIndex;
  const setId = req.body.setId;

  // User.findOne({ _id: userId }).then((user, err) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     });
  //   }
  //   const isQuestionExist = user.bookmarks.filter((q) => q === questionId);
  //   console.log(isQuestionExist);
  //   // console.log(user.bookmarks);
  //   if (isQuestionExist.length < 1) {
  //     user.bookmarks.push(questionId);
  //     user.save().then((quser, err) => {
  //       if (err) {
  //         return res.status(400).json({
  //           error: err,
  //         });
  //       }
  //       return res.json({
  //         user: quser,
  //       });
  //     });
  //   } else {
  //     return res.json({
  //       msg: "Already in Fav",
  //     });
  //   }
  // });
};

exports.removeQuestionToBookmark = (req, res) => {
  Pig.box("REMOVE: Question to Bookmark");
  Pig.box("REMOVE: Question To Fav");
  const questionId = req.body.questionId;
  const userId = req.body.userId.value;
  User.findOne({ _id: userId }).then((user, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    const isQuestionExist = user.bookmarks.filter((q) => q === questionId);
    const isQuestionExistIndex = user.bookmarks.findIndex(
      (q) => q === questionId
    );

    // console.log('isQuestionExist remove     -> ', isQuestionExist);
    // console.log('isQuestionExist Index remove     -> ', isQuestionExistIndex);

    const userFav = user.bookmarks;
    console.log(userFav);
    userFav.splice(isQuestionExistIndex, 1);
    console.log(userFav);
    user.bookmarks = userFav;
    user.save().then((quser, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        user: quser,
      });
    });
  });
};
