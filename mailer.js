const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const dotenv = require('dotenv').config();

//Authenticator
const auth = {
  auth: {
    api_key: process.env.api_key, // Add you API key
    domain: process.env.domain    // Add you domain
  }
};

//Mailing setup
const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, callback) => {
  const mailOptions = {
    from: email,
    to: 'you@email.com',
    subject: subject,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, data) {
    if (error) {
      callback(error, null);
      console.log('Ops! I did it again!!');
    } else {
      callback(null, data);
      console.log('Message sent!')
    }
  });
};

module.exports = sendMail;