const mongoose = require("mongoose");

const Users = mongoose.model(
  "users",
  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart: Array,
  })
);

module.exports = Users;
