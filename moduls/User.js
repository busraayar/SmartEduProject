const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next){
  const user = this;
  bcryptjs.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  })
})

const User = mongoose.model("User", UserSchema);
module.exports = User;