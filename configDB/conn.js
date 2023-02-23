const mongoose = require("mongoose");
require("dotenv").config();
let senha = process.env.DBPASSWORD || process.env.MONGOPASSWORD;
const URL_DATABASE = `mongodb+srv://felipe:${senha}@cluster0.gylfsdj.mongodb.net/DishoDB?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose.connect(URL_DATABASE);
console.log("senha database:" + senha);
module.export = mongoose;
