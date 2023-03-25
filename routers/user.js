const express = require('express');
const { isUserExist } = require('../controllers/user');
const { sendVerificationCode } = require('../controllers/email/email');
const route = express.Router();


route.post("/user/auth/check", isUserExist);
route.post("/user/auth/send/code", sendVerificationCode);

module.exports = route;