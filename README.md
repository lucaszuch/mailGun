# E-mail system using Node.js and Mailgun

## Features:
This small project will help you to send an email on form submission using nodejs and mailgun.

### Prerequises:
- Nodejs (Installed);
- Mailgun (API_KEY and DOMAIN).

## Technologies/Frameworks:
- HTML;
- CSS;
- JavaScript;
- jQuery;
- Nodejs;
- Express;
- Nodemailer;
- [Mailgun](https://login.mailgun.com/login/).

# How to set up:
Follow the steps below in order to install all the dependencies and run the packages.

### Step 1
Create a folder and navigate to it on your command line. Create a package.json running npm start. We are using index.js in the case, feel free to use server.js or any name.

### Step 2
Before running any of the following steps. Make sure you are installing all dependencies needed for this project.
- express;
- nodemailer;
- nodemailer-mailgun-transporter;
- dotenv.

### Step 3
Create index.js and import express to the index.js, set the port 5000. Also, we're are going to set the data parsing:

    //Importing dependencies
    const express = require('express');
    const app = express();
    const PORT = 5000;

    //Importing modules
    const sendMail = require('./mailer');

    //Data parsing
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //Routing
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/index.html');
    });

    //Listen to PORT 5000
    app.listen(PORT, () => {
      console.log(`App listening at port: ${PORT}.`);
    });
    
We are setting app.get to index.html. Create the index.html and place it in the folder views.

### Step 4
We will be requesting jQuery to take the information submitted on the form and send it as an object data. In this case, the code will be inside the public/js in order to make visualization easier. It is highly recommended to keep the script.js apart from the HTML.

    // Starts jQuery
    $(document).ready(() => {
      $('form').on('submit', (event) => {
        event.preventDefault();
        // Takes the form input and places it in the data object
        const email = $('#form-email').val().trim();
        const subject = $('#form-subject').val().trim();
        const text = $('#form-text').val().trim();

        const data = {
          email,
          subject,
          text
        };
        // Post it to the server
        $.post('/email', data, function() {
          console.log("Server received the submission");
        });

        //Give a feedback to user & reset form
        if(text !== '') {
          alert('Message sent!');
          document.querySelector('form').reset();
        } else {
          alert('Ops! You forgot something, we won\' send this message');
        }
      });
    });

### Step 5
Once we have the data we can generate our mail.js. Here you will need your mailgun api_key and domain, we will understand how to get it in the next steps.

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
          console.log('Internal Error');
        } else {
          callback(null, data);
          console.log('Message sent!')
        }
      });
    };

    module.exports = sendMail;
    
### Step 6
In order to obtain the apiKey and domain. Navigate to MailGun, create an account (if you don't have one), scroll all the way down in the dashboard page, you should see your api_key (private) and domain.

### Step 7
Now, import sendMail and create the /post.

    const sendMail = require('./mailer');

    app.post('/email', (req, res) => {
      const {subject, email, text} = req.body;

      console.log('Data: ', req.body);
      sendMail(email, subject,  text, function(error, data) {
        if(error) {
          res.status(500).json({
            message: 'Internal error.'
          });
        } else {
          res.json({
            message: 'Email sent! Thank you.'
          });
        }
      });
    });




