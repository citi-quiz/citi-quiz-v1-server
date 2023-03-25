const Pig = require('pigcolor');

const { request } = require('express');
var nodemailer = require('nodemailer');


// ?? -------------------------------------------[ Email Sender Module ]




const sendEmail = (to, subject, msg, html) => {
    // var transporter = nodemailer.createTransport('smtps://citiquiz@hotmail.com:citiciti2023@smtp.hotmail.com');

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
        text: msg,
        html: html
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return false
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}


exports.sendVerificationCode = async(req, res) => {
    Pig.box("EMAIL CODE");
    const to = req.body.to
    const subject = "citi-quiz.com - Verification Code"
    const text = req.body.code
    const html = req.body.html
    const codeStatus = await sendEmail(to, subject, text, html);
    if (codeStatus) {
        return res.json({
            msg: "To Verification Page",
            redirect: true
        })
    } else {
        return res.json({
            msg: "To Error Page",
            redirect: false
        })
    }
}