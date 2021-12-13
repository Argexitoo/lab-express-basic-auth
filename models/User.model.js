const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']

  },
  hashedPassword: {
   type: String,
   required: [true, "password is required"],
  }
});

const User = model("User", userSchema);

module.exports = User;
