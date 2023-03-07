const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./configDB/conn");
const mongoose = require("mongoose");
const cerealsModel = require("./model/cerealsModel");
const fruitsController = require("./controllers/fruits");
const vegetablesController = require("./controllers/vegetables");
const cerealsController = require("./controllers/cereals");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(fruitsController);
app.use(vegetablesController);
app.use(cerealsController);

app.listen(PORT, () => {
  console.log("Server is ON in port:" + PORT);
});
