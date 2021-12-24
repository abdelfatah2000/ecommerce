const nodemailer = require("nodemailer");

// async function sendemail(email, token) {
//   let transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME, // generated ethereal user
//       pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//     },
//   });
//   await transporter.sendMail({
//     from: "Brandistic <hello@Brandistic>", // sender address
//     to: email, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: `to verfiy <a href = "http://localhost:${process.env.PORT}/users/verfiy/${token}" target="_blank">Click here</a>`
//   })
// }

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });
  const mailOptions = {
    from: "E-Commerce", 
    to: options.email,
    subject: options.subject,
    html: options.html, 
    attachements: options.attachements,
  };
  await transporter.sendMail(mailOptions)
};

module.exports = sendEmail 
