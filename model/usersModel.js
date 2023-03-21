const mongoose = require("mongoose");

const Users = mongoose.model(
  "users",
  mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

module.exports = Users;
