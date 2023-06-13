const Pig = require("pigcolor");

const nodemailer = require("nodemailer");
const user = require("../../modules/user");
require("dotenv").config();

const sendGmailToUser = async (userEmails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "help.citi.quiz@gmail.com",
      clientId:
        "533381035374-imqb0tj97mpao8fqcv65g538pl3qhmtq.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04gvJHdwMzzrPCgYIARAAGAQSNwF-L9Irobjq_iXy0vC7G-IGyW1w7r-8GXWUMBLBRFCOdD57-HcVpIOX3hVIKA3elAQDIIcFkXo",
      accessToken:
        "ya29.a0AWY7CkkgO1C3g66oLOvzSELgve0pe_ADPE6hsgdY68fc-IyXH-fcKPaIVQKaNfkBn3VlqPDW0L14CCFBZUqYWHbu3dGHWcWF7je8eoyZ4MoBnXw0hDTGxsi0pPm9SlSyZfWKOg77oltTOX7R0ioyER4N27IHaCgYKAWUSARASFQG1tDrp6NM-Gq2IN206G9HV91wWgw0163",
    },
  });

  const mailOption = {
    from: "citi-quiz.com - Your Quiz Partner <help.citi.quiz@gmail.com>",
    to: userEmails,
    subject: "Attend New Set",
    text: "citi-quiz.com new setr",
    html: "<div><p><b>citi-quiz.com - New Set</b></p></div>",
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
      // console.log("All Emails - ", allNotify);
      console.log("All Emails - ", allNotify);
      let allUserEmails = [];
      if (allNotify)
        allNotify.map((email) => {
          allUserEmails.push(email.email);
        });
      console.log("All Emails list - ", allUserEmails);
      // Send email to all
      const sendEmailRes = await sendGmailToUser(allUserEmails)
        .then((res) => {
          console.log("Email Send!!!", res);

          return res.json({
            email: "All Done",
            to: allNotify,
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
