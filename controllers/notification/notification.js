const Pig = require("pigcolor");

const nodemailer = require("nodemailer");
const user = require("../../modules/user");
const Notification = require("../../modules/notification");
const { v4: uuidv4 } = require("uuid");
const notification = require("../../modules/notification");
require("dotenv").config();


exports.getAllNotifications = (req, res) => {
  Pig.box("GET: All Notification");
  Notification.find({}).then((notify, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({
      allNotifications: notify
    })
  }).catch((err) => {
    return res.json({
      error: err,
    });
    })
}

const sendGmailToUser = async (userEmails, makeSetLink, title) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    scope: 'https://mail.google.com',
    secure: true,
    auth: {
      type: "OAuth2",
      user: "help.citi.quiz@gmail.com",
      clientId:
      "533381035374-imqb0tj97mpao8fqcv65g538pl3qhmtq.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:"1//04v7TDxEseXr0CgYIARAAGAQSNwF-L9IriMzJc7YEX8MofJ1O-7psBNtk9uAHX9Ucq5WYVbpOdmvqggxf00d4g3B_qFlYANIK_E0",
      accessToken:
        "ya29.a0AWY7CkmX3n6tnBZ2O0CkexayVJQEYcGXdvm9Mv1wKUEu9Oab2mailz2loZDJPHVL572ZZN7_I0TuEXA8Dc8cPQShmr2gtZnKVQenkka-3GUSofgAu6ZfbAcqih0SwZvwUfDIje6s7d24btW_lHN5ySX3y7EJaCgYKAXoSARASFQG1tDrpqW9UhuQ8jvF7pxjK0ZF7Bw0163",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOption = {
    from: "citi-quiz.com - Your Quiz Partner <help.citi.quiz@gmail.com>",
    to: userEmails,
    subject: "Attend New Set",
    text: "citi-quiz.com new setr",
    html: `<div><p><b>citi-quiz.com - New Set</b><a href=${makeSetLink}>${title}</a></p></div>`,
  };

  try {
    const result = await transporter.sendMail(mailOption);
    return result;
  } catch (error) {
    return error;
  }
};

exports.createNotification = async (req, res) => {
  Pig.box("Create Notification");
  console.log(req.body);

  const makeSetLink = `http://localhost:8100/set/${req.body.set}/modes`;

  user
    .find({})
    .select("email")
    .then(async (allNotify, err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (!allNotify) {
        return res.json({
          msg: "User not found",
        });
      }
      console.log("All Emails - ", allNotify);
      console.log("All Emails - ", allNotify);
      let allUserEmails = [];
      if (allNotify)
        allNotify.map((email) => {
          allUserEmails.push(email.email);
        });
      console.log("All Emails list - ", allUserEmails);
      // Save Notification

      const notification = Notification();
      notification.notificationId = uuidv4();
      notification.notificationTitle = req.body.title;
      notification.notificationDescription = req.body.message;
      notification.notificationLink = req.body.set;
      // Send email to all
      notification.save().then((notify, err) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        return res.json({
          notify: notify
        })
    }).catch((err) => {
        console.log(err);
    });
      // const sendEmailRes = await sendGmailToUser(allUserEmails,makeSetLink, req.body.title)
      //   .then((emailres) => {
      //     console.log("Email Send!!!", emailres);
       
      //     return ({
      //       email: "All Done",
      //       to: allNotify,
      //     });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    
      
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
    });
};

exports.destroyNotification = (req, res) => {
  Pig.box("Destroy Notification");
};


exports.deleteNotification = (req, res) => {
  Pig.box("Delete Notification");
  console.log("Req ", req.body);
  if(req.body.notifiId)
  Notification.findByIdAndDelete({ _id: req.body.notifiId._id}).then((notifi, err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({
      msg: "Deleted"
    })
  }).catch((err) => {
    res.json({
      error: err
    })
  })
  else{
    return res.json({
      msg: "Notification ID is empty"
    })
  }
}