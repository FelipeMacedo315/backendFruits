const mongoose = require("mongoose");
const { Schema } = mongoose;

const fruits = mongoose.model(
  "frutas",
  new Schema({
    name: String,
    price: Number,
  })
);

module.exports = fruits;
