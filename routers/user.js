const express = require('express');
const { isUserExist, createUser, verifyUserCode } = require('../controllers/user');
const { sendVerificationCode } = require('../controllers/email/email');
const route = express.Router();


route.post("/user/auth/check", isUserExist);
route.post("/user/auth/send/code", sendVerificationCode);


route.post("/user/create/new", createUser);
route.post("/user/verify", verifyUserCode);

module.exports = route;