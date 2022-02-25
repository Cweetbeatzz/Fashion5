const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "<user>",
    pass: "<pass>",
  },
});

// message = {
//       from: "from-example@email.com",
//       to: "to-example@email.com",
//       subject: "Subject",
//       text: "Hello SMTP Email"
//  }
//  transporter.sendMail(message, **function**(err, info) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(info);
//       }

//           message = {
//       from: "from@email.com",
//       to: "to@email.com",
//       subject: "Subject",
//       html: "<h1>Hello SMTP Email</h1>"
//   }
