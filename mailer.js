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

const sendMail = (email, subject, text) => {
  const mailOptions = {
    from: email,
    to: 'lucaszuch@outlook.com',
    subject: subject,
    text: text
  };

  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, data) {
        if (error) {
          console.log('Ops! I did it again!!');
          reject(error);
        }
        console.log('Message sent!')
        resolve(data);
      });
  });
};

module.exports = sendMail;