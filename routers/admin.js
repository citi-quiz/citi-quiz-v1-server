const express = require('express');
const { createSetCategory, updateSetCategory, deleteSetCategory, getAllSubCategory, getASubCategory } = require('../controllers/admin/subcategory');
const { createSets, updateSets, deleteSets, getAllSets, getASets, getAllSetsByCategory } = require('../controllers/sets');
const { createQuestion, getAllQuestions, getAQuestion } = require('../controllers/questions');
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


route.get("/question/get/all", getAllQuestions);
route.get("/sets/get/a/:qId", getAQuestion);

module.exports = route;