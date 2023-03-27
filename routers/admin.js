const express = require('express');
const { createSetCategory, updateSetCategory, deleteSetCategory } = require('../controllers/admin/subcategory');
const route = express.Router();


route.post("/setcategory/create", createSetCategory);
route.put("/setcategory/update", updateSetCategory);
route.delete("/setcategory/delete", deleteSetCategory);


module.exports = route;