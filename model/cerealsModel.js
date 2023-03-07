const mongoose = require("mongoose");
const { Schema } = mongoose;

const cereals = mongoose.model(
  "cereals",
  new Schema({
    name: String,
    price: Number,
    image: Array,
  })
);

module.exports = cereals;
