const nodemailer = require("nodemailer");

const sendEmail = async (recipientEmail, createdToken, host) => {
  console.log('host ', host)

  if (host === 'localhost') {
    host = 'http://' + host + ':' + process.env.PORT
    console.log('host here: ', host)
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Zvolte odpovídající emailový server nebo použijte SMTP údaje
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // Váš email
        pass: process.env.EMAIL_PASSWORD, // Heslo k emailu
      },
      tls: {
        rejectUnauthorized: false, // Toto povoluje self-signed certifikáty
      },
    });
    const mailOptions = {
      from: process.env.FROM_EMAIL, 
      to: recipientEmail, // Email příjemce
      subject: 'Reset hesla', // Předmět emailu
      html: `Váš link pro resetování hesla je <a href="${host}/reset-password?id=${createdToken._id}&token=${createdToken.token}">zde</a>`,
    };

    // Odešlete email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email byl úspěšně odeslán: ' + info.response);
      }
    }); 
  } catch (error) {
    
  }
}

module.exports = sendEmail;