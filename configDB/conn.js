const mongoose = require("mongoose");
require("dotenv").config();
const URL_DATABASE = `mongodb+srv://felipe:${process.env.DBPASSWORD}@cluster0.gylfsdj.mongodb.net/DishoDB?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose.connect(URL_DATABASE);

module.export = mongoose;
