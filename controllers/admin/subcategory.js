const Pig = require("pigcolor");
const SubCategory = require("../../modules/setcategory");
const Question = require("../../modules/question");
const User = require("../../modules/user");
const question = require("../../modules/question");

exports.createSetCategory = (req, res) => {
  Pig.box("CREATE: Set Category");
  const newSubCategory = new SubCategory();
  newSubCategory.name = req.body.name;
  newSubCategory
    .save()
    .then((cate, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        cate: cate,
      });
    })
    .catch((err) => {
      return res.json({
        error: err,
      });
    });
};

exports.updateSetCategory = (req, res) => {
  Pig.box("UDATE: Set Category");
  SubCategory.findById({ _id: req.body.cateid })
    .then((cate, err) => {
      if (err)
        return res.status(400).json({
          error: err,
        });
      cate.name = req.body.name;
      cate.save().then((newcate, err) => {
        if (err)
          return res.json({
            cate: cate,
          });
        return res.json({
          newcate: newcate,
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.deleteSetCategory = (req, res) => {
  Pig.box("DELETE: Set Category");
  SubCategory.findByIdAndDelete({ _id: req.body.cateid })
    .then((cate, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        cate: cate,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
  // TODO: Fix Deleteing Issue
};

exports.getAllSubCategory = (req, res) => {
  Pig.box("GET ALL: Sub Category");
  SubCategory.find({})
    .then((allsubcategory, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        cate: allsubcategory,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.getAllSubCategoryAvailablity = (req, res) => {
  Pig.box("GET ALL: Sub Category Available");
  const setID = req.params.setId;

  question.find({setUnder: setID},"questionCategory").then((categories, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    let allIds = [];
    // console.log(categories);
    categories.map((cate) => {
      allIds.push(cate.questionCategory);
    });
    // console.log(allIds);

      SubCategory.find({}).where('_id').in(allIds).exec().then((allSubCate, err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        console.log(allSubCate);
        return res.json({
          cate: allSubCate,
        });
      }).catch((err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
      })
    
  }).catch((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
  })


  // SubCategory.find({})
  //   .then((allsubcategory, err) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: err,
  //       });
  //     }
  //     return res.json({
  //       cate: allsubcategory,
  //     });
  //   })
  //   .catch((err) => {
  //     return res.status(400).json({
  //       error: err,
  //     });
  //   });
};

exports.getASubCategory = (req, res) => {
  Pig.box("GET A: Sub Category");
  const subcategoryId = req.params.subcategoryId;
  SubCategory.findById({ _id: subcategoryId })
    .then((subcategory, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        cate: subcategory,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

// ? Special Request Questions
// ? Special Request Questions
exports.getQuestionsAllInSetCategory = (req, res) => {
  const reviewIndex = req.params.index;
  Pig.box("GET ALL: Questions from Subcategory");
  console.log("allparams - ", req.params);
  User.findOne({ _id: req.params.userId }).then(async(user, err) => {  
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log(user.reviewBookmarkIndex.length);
    console.log(req.params.setId);

    if(user.reviewBookmarkIndex.length === 0){
      Question.find({
              setUnder: req.params.setId,
              questionCategory: req.params.setCategory
            })
              .then((allQuestions, err) => {
                if (err) {
                  return res.status(400).json({
                    error: err,
                  });
                }
                return res.json({
                  allQuestions: allQuestions,
                  currentQuestionIndex: 0,
                });
              })
              .catch((err) => {
                if (err) {
                  return res.status(400).json({
                    error: err,
                  });
                }
              });
    }
    else if(user.reviewBookmarkIndex.length > 0){
      const findSet = [...user.reviewBookmarkIndex];
        const findSetIndex = await findSet.findIndex(
          (b) => b.setId === req.params.setId && b.category === req.params.setCategory
        );
        const findSetIndexInfo = await findSet.filter(
          (b) => b.setId === req.params.setId && b.category === req.params.setCategory
        );
        console.log('findSetIndexInfo - ', findSetIndexInfo);
        if(findSetIndexInfo.length > 0 ){
          Question.find({
            questionCategory: req.params.setCategory,
            setUnder: req.params.setId,
          })
            //   .skip(findSetIndexInfo[0].reviewBookmarkIndex)
            .then((allQuestions, err) => {
              if (err) {
                return res.status(400).json({
                  error: err,
                });
              }
              console.log("Bookmarrk there - > >>>> ",allQuestions);
              return res.json({
                allQuestions: allQuestions,
                currentQuestionIndex: findSetIndexInfo[0].reviewBookmarkIndex,
              });
            })
            .catch((err) => {
              if (err) {
                return res.status(400).json({
                  error: err,
                });
              }
            });
        }
        else{
          Question.find({
            setUnder: req.params.setId,
            questionCategory: req.params.setCategory

          })
            .then((allQuestions, err) => {
              if (err) {
                return res.status(400).json({
                  error: err,
                });
              }
              return res.json({
                allQuestions: allQuestions,
                currentQuestionIndex: 0,
              });
            })
            .catch((err) => {
              if (err) {
                return res.status(400).json({
                  error: err,
                });
              }
            });
        }


    //     if (req.params.setCategory === "all") {
    //       Question.find({
    //         setUnder: req.params.setId,
    //       })
    //         .then((allQuestions, err) => {
    //           if (err) {
    //             return res.status(400).json({
    //               error: err,
    //             });
    //           }
    //           return res.json({
    //             allQuestions: allQuestions,
    //             currentQuestionIndex: 0,
    //           });
    //         })
    //         .catch((err) => {
    //           if (err) {
    //             return res.status(400).json({
    //               error: err,
    //             });
    //           }
    //         });
    //     } else {
    //       console.log("not all");
    //       Question.find({
    //         questionCategory: req.params.setCategory,
    //         setUnder: req.params.setId,
    //       })
    //         //   .skip(findSetIndexInfo[0].reviewBookmarkIndex)
    //         .then((allQuestions, err) => {
             
    //           console.log("allQuestions Ho Ho Ho- ", allQuestions, err);
    //           return res.json({
    //             allQuestions: "iuhiuji",
    //             currentQuestionIndex: findSetIndexInfo[0].reviewBookmarkIndex,
    //           });
    //         })
    //         .catch((err) => {
    //           console.log("******allQuestions - catch", err);
    //           if (err) {
    //             return ({
    //               error: err,
    //             });
    //           }
    //         });
    // }
    }
  });
};
