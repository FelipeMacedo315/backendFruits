const mongoose = require("mongoose");
require("dotenv").config();
// Recebe a senha do arquivo .ENV ou do Railway
// Railway é a hospedagem
let senha = process.env.DBPASSWORD || process.env.MONGOPASSWORD;
const URL_DATABASE = `mongodb+srv://felipe:${senha}@cluster0.gylfsdj.mongodb.net/DishoDB?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose.connect(URL_DATABASE);
module.export = mongoose;
