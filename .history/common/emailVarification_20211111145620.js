const nodemailer = require("nodemailer")


async function sendemail(email, token) {
  let transporter = nodemailer.createTransport({
    host: process.env.
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `to verfiy <a href = "http://localhost:${process.env.PORT}/users/verfiy/${token}" target="_blank">Click here</a>`
  })
}

module.exports = { sendemail }