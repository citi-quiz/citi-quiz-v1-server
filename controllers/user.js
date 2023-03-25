const Pig = require('pigcolor');


exports.isUserExist = (req, res) => {
    Pig.box("USER: Exist");


}


exports.verifyUserCode = (req, res) => {
    Pig.box("USER: Code Verification");


}

exports.createUser = (req, res) => {
    Pig.box("USER: Create");


}