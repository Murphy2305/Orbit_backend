const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    phoneNumber: { type: "String", unique: true, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;