const Pig = require("pigcolor");
const User = require("../modules/user");
const { v4: uuidv4 } = require("uuid");
var nodemailer = require("nodemailer");
const Bookmark = require("../modules/bookmark");
const Favorite = require("../modules/favorite");
const Test = require("../modules/test");

exports.isUserExist = (req, res) => {
  Pig.box("USER: Exist");

  console.log(req.body);
  if (req.body.token.value === "null") {
    return res.json({
      userIs: "AUTH_NO",
    });
  }

  User.findById({ _id: req.body.token.value })
    .then((user, err) => {
      console.log("user, err", user, err);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!user) {
        return res.json({
          userIs: "AUTH_NO",
        });
      }
      return res.json({
        user: user,
        userIs: "AUTH_YES",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });

  // return res.json({
  //     user: "NO"
  // });
};

exports.verifyUserCode = (req, res) => {
  Pig.box("USER: Code Verification");
  const userCode = req.body.data.code;
  console.log("code", userCode);

  User.findOne({ verificationCode: userCode }).then(async (thatUser, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (!thatUser) {
      return res.json({
        msg: "User code is wrong",
      });
    } else {
      thatUser.email_verified = "True";
      thatUser
        .save()
        .then((suser, err) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          console.log("suser - ", suser);
          return res.json({
            user: suser,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

exports.createUser = async (req, res) => {
  Pig.box("USER: Create");

  const vcode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  const bfcode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

  const newUser = new User();
  newUser.name = req.body.data.name;
  newUser.email = req.body.data.email;
  newUser.password = req.body.data.password;
  newUser.user_temp_id = uuidv4();
  newUser.email_verified = "false";
  newUser.verificationCode = vcode;

  // const newBookmark = new Bookmark();
  // newBookmark.bookmarkId = uuidv4();
  // newBookmark.bookmarkName = "bookmark" + bfcode;
  // const bookmarkHere = await newBookmark.save();
  // newUser.bookmarks = bookmarkHere._id;
  const newFavorite = new Favorite();
  newFavorite.favoriteId = uuidv4();
  newFavorite.favoriteName = "favorite" + bfcode;
  const favoriteHere = await newFavorite.save();
  newUser.favorites = favoriteHere._id;
  // console.log("Bookmark and Favorits - ", bookmarkHere._id, favoriteHere._id);
  // Verification Code Section
  const to = req.body.data.email;
  const subject = "citi-quiz.com - Verification Code";
  const text = `Hi ${req.body.data.name} Your Verification Code is ` + vcode;
  const html = "";

  console.log(req.body.data);
  newUser
    .save()
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      console.log(user);
      return res.json({
        msg: "To Verification Page",
        redirect: true,
        user: user,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });

  // var transporter = nodemailer.createTransport({
  //     host: "smtp.office365.com", // hostname
  //     secureConnection: false, // TLS requires secureConnection to be false
  //     port: 587, // port for secure SMTP
  //     tls: {
  //         ciphers: 'SSLv3'
  //     },
  //     auth: {
  //         user: 'citiquiz@hotmail.com',
  //         pass: 'citiciti2023'
  //     }
  // });

  // var mailOptions = {
  //     from: 'citiquiz@hotmail.com',
  //     to: to,
  //     subject: subject,
  //     text: text,
  //     html: ""
  // };
  // console.log("EMAIL GOING TO SEND");

  // transporter.sendMail(mailOptions, function(error, info) {
  //     console.log("INFOR , ERROR ", info, error);

  //     if (info) {
  //         return res.json({
  //             msg: "To Verification Page",
  //             redirect: true,
  //             user: nUser
  //         })
  //     }
  //     console.log("INFOR , ERROR ", info, error);
  //     if (error) {
  //         return res.json({
  //             msg: "Error Page",
  //             redirect: false
  //         })
  //     }
  // })
};

exports.loginUser = async (req, res) => {
  Pig.box("USER: Login");
  console.log(req.body.data);
  User.findOne({ email: req.body.data.email })
    .then((user, err) => {
      console.log("user, err", user, err);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!user) {
        return res.json({
          userMsg: "User doesn't exist",
          code: "red",
        });
      } else if (!user.authenticate(req.body.data.password)) {
        return res.json({
          userMsg: "You have entered wrong password",
          code: "red",
        });
      } else if (user.authenticate(req.body.data.password)) {
        return res.json({
          user: user,
          userMsg: "AUTH_YES",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        code: "red",
      });
    });
};

exports.resendVerificationCode = (req, res) => {
  Pig.box("USER: Resend Verification Code");
};

// Get User Data

exports.getAllUsers = (req, res) => {
  Pig.box("GET ALL: Users");
  User.find({})
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!user) {
        return res.json({
          msg: "User is Empty",
        });
      }
      return res.json({
        users: user,
      });
    })
    .catch((err) => {
      console.log("Error - ", err);
    });
};

exports.getAUser = (req, res) => {
  Pig.box("GET A: User");
  const userId = req.params.userId;
  User.findById({ _id: userId })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!user) {
        return res.json({
          user: "User is Empty",
        });
      }
      return res.json({
        users: user,
      });
    })
    .catch((err) => {
      console.log("Error - ", err);
    });
};

exports.extractAllUserDetails = (req, res) => {
  Pig.box("Extract: All User Details");
  const userId = req.params.userId;

  User.findById({ _id: userId })
    .then((user, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!user) {
        return res.json({
          msg: "User Not Found",
        });
      }
      Test.find()
        .where("_id")
        .in(user.tests)
        .exec()
        .then((alldetails, err) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          return res.json({
            allUserDetails: user,
            allTestDetails: alldetails,
          });
        })
        .catch((err) => {
          console.log("Error - ", err);

          return res.status(400).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log("Error - ", err);

      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
    });
};
