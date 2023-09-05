const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  const outputMessage = `
    <h1> MAİL DETAILS </h1>
    <ul>
      <li>Name: ${req.body.name} </li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1> MESSAGES </h1>
    <p> ${req.body.message}</p>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'camilla.schroeder32@ethereal.email',
        pass: 'XHB2gygzJVABGW52HA'
    }
});

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Smartedu sending email to you" <camilla.schroeder32@ethereal.email>', // sender address
    to: "busra.ayaar@gmail.com", // list of receivers
    subject: "Smartedu ✔", // Subject line
    html: outputMessage, // html body
  });

  req.flash("success", "We Received your message succesfully");

  console.log("Message sent: %s", info.messageId);
};
