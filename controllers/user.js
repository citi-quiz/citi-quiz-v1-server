const Pig = require('pigcolor');
const User = require('../modules/user');
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
const Bookmark = require('../modules/bookmark');
const Favorite = require('../modules/favorite');


exports.isUserExist = (req, res) => {
    Pig.box("USER: Exist");
    return res.json({
        user: "NO"
    })
}


exports.verifyUserCode = (req, res) => {
    Pig.box("USER: Code Verification");
    const userCode = req.body.data.code;
    console.log("code", userCode);

    User.findOne({ verificationCode: userCode })
        .then(async(thatUser, err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            if (!thatUser) {
                return res.json({
                    msg: "User code is wrong"
                })
            } else {
                thatUser.email_verified = "True"
                thatUser.save()
                    .then((suser, err) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        }
                        console.log("suser - ", suser);
                        return res.json({
                            user: suser
                        })

                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        })



}


exports.createUser = async(req, res) => {
    Pig.box("USER: Create");

    const vcode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    const bfcode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)

    const newUser = new User();
    newUser.name = req.body.data.name;
    newUser.email = req.body.data.email;
    newUser.password = req.body.data.password;
    newUser.email_verified = "false";
    newUser.verificationCode = vcode

    const newBookmark = new Bookmark();
    newBookmark.bookmarkId = uuidv4();
    newBookmark.bookmarkName = "bookmark" + bfcode;
    const bookmarkHere = await newBookmark.save();
    newUser.bookmarks = bookmarkHere._id;
    const newFavorite = new Favorite();
    newFavorite.favoriteId = uuidv4();
    newFavorite.favoriteName = "favorite" + bfcode;
    const favoriteHere = await newFavorite.save();
    newUser.favorites = favoriteHere._id;
    console.log("Bookmark and Favorits - ", bookmarkHere._id, favoriteHere._id);
    // Verification Code Section
    const to = req.body.data.email;
    const subject = "citi-quiz.com - Verification Code"
    const text = `Hi ${req.body.data.name} Your Verification Code is ` + vcode
    const html = ""

    console.log(req.body.data);
    const nUser = await newUser.save();



    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'citiquiz@hotmail.com',
            pass: 'citiciti2023'
        }
    });

    var mailOptions = {
        from: 'citiquiz@hotmail.com',
        to: to,
        subject: subject,
        text: text,
        html: ""
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (info) {
            return res.json({
                msg: "To Verification Page",
                redirect: true,
                user: nUser
            })
        }
        console.log("INFOR , ERROR ", info, error);
        if (error) {
            return res.json({
                msg: "Error Page",
                redirect: false
            })
        }
    })

}


exports.resendVerificationCode = (req, res) => {
    Pig.box("USER: Resend Verification Code");

}