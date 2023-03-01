const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const conn = require("./configDB/conn");
const mongoose = require("mongoose");
const fruitsModel = require("./model/fruits");
const vegetablesModel = require("./model/vegetables");
const cerealsModel = require("./model/cereals");

const PORT = process.env.PORT || 3000;
// Send all fruits
app.get("/DishoApi/fruits", (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  fruitsModel
    .find({})
    .limit(limit)
    .skip(10 * (page - 1))
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
app.get("/DishoApi/vegetables", (req, res) => {
  vegetablesModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
app.get("/DishoApi/cereals", (req, res) => {
  cerealsModel
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is ON in port:" + PORT);
});
