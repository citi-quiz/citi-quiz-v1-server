const express = require('express');
const { isUserExist, createUser, verifyUserCode, loginUser, getAllUsers, getAUser } = require('../controllers/user');
const { sendVerificationCode } = require('../controllers/email/email');
const route = express.Router();


// ?? All Auth Section
route.post("/user/auth/check", isUserExist);
route.post("/user/auth/send/code", sendVerificationCode);


route.post("/user/create/new", createUser);
route.post("/user/login", loginUser);
route.post("/user/verify", verifyUserCode);


route.get("/get/all/users", getAllUsers);
route.get("/get/a/user/:userId", getAUser);

// ?? All Test and Questionary Section 

// * Bookmark
// route.post("/do/bookmark", );


module.exports = route;