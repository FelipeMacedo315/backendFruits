const mongoose = require("mongoose");
const { Schema } = mongoose;

const fruits = mongoose.model(
  "fruits",
  new Schema({
    name: String,
    price: Number,
    image: Array,
  })
);

module.exports = fruits;
