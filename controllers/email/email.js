const Pig = require('pigcolor');

const { request } = require('express');
var nodemailer = require('nodemailer');


// ?? -------------------------------------------[ Email Sender Module ]




const sendEmail = (to, subject, msg, html) => {
    var transporter = nodemailer.createTransport('smtps://thedot.clan@zohomail.in:8gQp8C2zgStm7uz@smtp.zoho.in');

    var mailOptions = {
        from: 'thedot.clan@zohomail.in',
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