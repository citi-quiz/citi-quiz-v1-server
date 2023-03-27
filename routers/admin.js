const express = require('express');
const { createSetCategory, updateSetCategory, deleteSetCategory, getAllSubCategory, getASubCategory } = require('../controllers/admin/subcategory');
const { createSets, updateSets, deleteSets } = require('../controllers/sets');
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

module.exports = route;