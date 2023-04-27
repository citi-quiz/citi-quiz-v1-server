const express = require('express');
const { createSetCategory, updateSetCategory, deleteSetCategory, getAllSubCategory, getASubCategory, getQuestionsAllInSetCategory } = require('../controllers/admin/subcategory');
const { createSets, updateSets, deleteSets, getAllSets, getASets, getAllSetsByCategory } = require('../controllers/sets');
const { createQuestion, getAllQuestions, getAQuestion, getQuestionAsSet, getQuestionsAllInSet, addQuestionToFavroits, getAllFavQuestions, removeQuestionToFavroits } = require('../controllers/questions');
const { initializeTest, getAllTests } = require('../controllers/test');
const route = express.Router();

// ******************** Sub Category **********************
route.post("/setcategory/create", createSetCategory);
route.put("/setcategory/update", updateSetCategory);
route.delete("/setcategory/delete", deleteSetCategory);

route.get("/setcategory/get/all", getAllSubCategory);
route.get("/setcategory/get/a/:subcategoryId", getASubCategory);



// ******************** Sets *************************
route.post("/sets/create", createSets);
route.put("/sets/update/:sId", updateSets);
route.delete("/sets/delete/:sId", deleteSets);

route.get("/sets/get/all", getAllSets);
route.get("/sets/get/a/:sId", getASets);
route.get("/sets/get/all/by/category/:categoryId", getAllSetsByCategory);



// ******************** Question *************************
route.post("/question/create", createQuestion);


route.get("/question/get/all/set/:setId", getQuestionsAllInSet);
route.get("/question/get/all/set/under/:setId/category/:setCategory", getQuestionsAllInSetCategory);
route.get("/question/get/all", getAllQuestions);
route.get("/question/get/a/:qId", getAQuestion);



// ?? Special Queries
route.get("/question/get/set/:setId/generate", getQuestionAsSet);
route.post("/question/add/user", addQuestionToFavroits);
route.post("/question/remove/user", removeQuestionToFavroits);
route.get("/question/get/all/fav/user/:userId", getAllFavQuestions);

// ********************* Test ****************************
route.post("/test/create", initializeTest);
route.get("/test/get/all", getAllTests);



module.exports = route;