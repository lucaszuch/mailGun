// Sending information to backend
$(document).ready(() => {
  $('form').on('submit', (event) => {
    event.preventDefault();

    const email = $('#form-email').val().trim();
    const subject = $('#form-subject').val().trim();
    const text = $('#form-text').val().trim();

    const data = {
      email,
      subject,
      text
    };

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