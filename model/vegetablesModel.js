const mongoose = require("mongoose");
const { Schema } = mongoose;

const vegetables = mongoose.model(
  "vegetables",
  new Schema({
    name: String,
    price: Number,
    image: Array,
  })
);

module.exports = vegetables;
