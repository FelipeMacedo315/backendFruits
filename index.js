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
  const limit = 10;
  const page = req.query.page;
  var totalProducts;
  var totalPages;
  const count = fruitsModel.find({}).then((result) => {
    totalProducts = result.length;
    totalPages = Math.ceil(totalProducts / limit);
  });
  fruitsModel
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .then((data) => {
      res.status(200).json({
        currentPage: page,
        nextPage: totalPages,
        totalItems: totalProducts,
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/DishoApi/vegetables", (req, res) => {
  const limit = 10;
  const page = req.query.page;
  var totalProducts;
  var totalPages;
  const count = vegetablesModel.find({}).then((result) => {
    totalProducts = result.length;
    totalPages = Math.ceil(totalProducts / limit);
  });
  vegetablesModel
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .then((data) => {
      res.status(200).json({
        currentPage: page,
        nextPage: totalPages,
        totalItems: totalProducts,
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/DishoApi/cereals", (req, res) => {
  const limit = 10;
  const page = req.query.page;
  var totalProducts;
  var totalPages;
  const count = cerealsModel.find({}).then((result) => {
    totalProducts = result.length;
    totalPages = Math.ceil(totalProducts / limit);
  });
  cerealsModel
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .then((data) => {
      res.status(200).json({
        currentPage: page,
        nextPage: totalPages,
        totalItems: totalProducts,
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is ON in port:" + PORT);
});
