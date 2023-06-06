const express = require("express");
const {
  createSetCategory,
  updateSetCategory,
  deleteSetCategory,
  getAllSubCategory,
  getASubCategory,
  getQuestionsAllInSetCategory,
} = require("../controllers/admin/subcategory");
const {
  createSets,
  updateSets,
  deleteSets,
  getAllSets,
  getASets,
  getAllSetsByCategory,
  disableSets,
  enableSets,
} = require("../controllers/sets");
const {
  createQuestion,
  getAllQuestions,
  getAQuestion,
  getQuestionAsSet,
  getQuestionsAllInSet,
  addQuestionToFavroits,
  getAllFavQuestions,
  removeQuestionToFavroits,
  addQuestionToBookmark,
  removeQuestionToBookmark,
  getAllBookmarkQuestions,
  deleteQuestion,
  updateQuestion,
  getAllFavQuestionsUderSet,
  getQuestionAsSetIndexBased,
} = require("../controllers/questions");
const { initializeTest, getAllTests } = require("../controllers/test");
const {
  createNotification,
  destroyNotification,
} = require("../controllers/notification/notification");
const route = express.Router();

// ******************** Sub Category **********************
route.post("/setcategory/create", createSetCategory);
route.put("/setcategory/update", updateSetCategory);
route.delete("/setcategory/delete", deleteSetCategory);

route.get("/setcategory/get/all", getAllSubCategory);
route.get("/setcategory/get/a/:subcategoryId", getASubCategory);

// ******************** Sets *************************
route.post("/sets/create", createSets);
route.post("/sets/disable", disableSets);
route.post("/sets/enable", enableSets);
route.put("/sets/update/:sId", updateSets);
route.delete("/sets/delete/:sId", deleteSets);

route.get("/sets/get/all", getAllSets);
route.get("/sets/get/a/:sId", getASets);
route.get("/sets/get/all/by/category/:categoryId", getAllSetsByCategory);

// ******************** Question *************************
route.post("/question/create", createQuestion);
route.put("/question/update", updateQuestion);
route.delete("/question/delete", deleteQuestion);

route.get("/question/get/all/set/:setId", getQuestionsAllInSet);
route.get(
  "/question/get/all/set/under/:setId/category/:setCategory/review/:userId",
  getQuestionsAllInSetCategory
);
route.get("/question/get/all", getAllQuestions);
route.get("/question/get/a/:qId", getAQuestion);

// ?? Special Queries
route.get("/question/get/set/:setId/generate", getQuestionAsSet);
route.get(
  "/question/get/set/:setId/generate/index/:ind",
  getQuestionAsSetIndexBased
);
route.post("/question/add/user", addQuestionToFavroits);
route.post("/question/add/bookmark/user", addQuestionToBookmark);
route.post("/question/remove/bookmark/user", removeQuestionToBookmark);
route.post("/question/remove/user", removeQuestionToFavroits);
route.get("/question/get/all/fav/user/:userId", getAllFavQuestions);
route.get(
  "/question/get/all/fav/setunder/:setId/user/:userId",
  getAllFavQuestionsUderSet
);
route.get("/question/get/all/bookmark/user/:userId", getAllBookmarkQuestions);

// ********************* Test ****************************
route.post("/test/create", initializeTest);
route.get("/test/get/all", getAllTests);

// ********************* Notification Module ****************************
route.post("/notification/create", createNotification);
route.delete("/notification/destroy", destroyNotification);

module.exports = route;
