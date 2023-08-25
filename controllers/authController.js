const User = require("../moduls/User");
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user =await User.findOne({email});
    if(user){
      bcryptjs.compare(password, user.password, (err, same)=>{
        if(same){
          res.status(200).send('LOGGED IN BRO');
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
