const Pig = require('pigcolor');
const User = require('../modules/user');

exports.isUserExist = (req, res) => {
    Pig.box("USER: Exist");


}


exports.verifyUserCode = (req, res) => {
    Pig.box("USER: Code Verification");


}

exports.createUser = (req, res) => {
    Pig.box("USER: Create");

    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.save((err, nuser) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
    })

}