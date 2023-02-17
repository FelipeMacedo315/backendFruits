const mongoose = require("mongoose");
const URL_DATABASE = "mongodb://127.0.0.1:27017/produtos";

mongoose.set("strictQuery", true);
mongoose.connect(URL_DATABASE);

module.export = mongoose;