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

//Sending the email
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

//Listen to PORT 5000 and Heroku app port
app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}.`);
});