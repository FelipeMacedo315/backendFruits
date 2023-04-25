const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./configDB/conn");
const fruitsController = require("./controllers/fruits");
const vegetablesController = require("./controllers/vegetables");
const cerealsController = require("./controllers/cereals");
const usersController = require("./controllers/users");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(fruitsController);
app.use(vegetablesController);
app.use(cerealsController);
app.use(usersController);

app.listen(PORT, () => {
  console.log("Server is ON in port:" + PORT);
});
