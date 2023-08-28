const User = require("../moduls/User");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcryptjs.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          //USER SESSION
          res.status(200).redirect("/users/dashboard");
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id: req.session.userID});
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user
  });
};
