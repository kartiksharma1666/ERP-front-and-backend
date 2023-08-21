const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String ,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    gender: String,     // Add gender field
    birthdate: String,  // Add birthdate field
    country: String,    // Add country field
    phone: String     
  })

const User = mongoose.model(
  "User", userSchema
);

module.exports = User;


