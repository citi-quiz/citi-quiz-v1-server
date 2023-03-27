const express = require('express');
const { createSetCategory } = require('../controllers/admin/subcategory');
const route = express.Router();


route.post("setcategory/create", createSetCategory);


module.exports = route;