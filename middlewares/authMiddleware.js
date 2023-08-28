const User = require("../moduls/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if(!user) return res.redirect('/login');
  next();
};
