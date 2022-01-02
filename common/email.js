const nodemailer = require("nodemailer");



const sendEmailInvoice = async (options) => {
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
    from: "E-Commerce <hello@Brandistic>",
    to: options.email,
    subject: options.subject,
    html: options.html,
    attachments: [
      {
        filename: "Invoice.pdf",
        path: "Invoice.pdf",
        contentType: "application/pdf",
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "gmail",
    auth: {
      user: "abdelfattahmohamed960@gmail.com", 
      pass: "1990amh1990", 
    },
  });
  const mailOptions = {
    from: "Brandistic <hello@Brandistic>", 
    to: options.email,
    subject: options.subject,
    html: options.html, 
  };
  await transporter.sendMail(mailOptions)
};


module.exports = {sendEmail,sendEmailInvoice};
