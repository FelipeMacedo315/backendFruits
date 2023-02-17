const express = require("express");
const app = express();
const conn = require("./configDB/conn");
const modelFruits = require("./model/main");

// Send all fruits
app.get("/fruits", (req, res) => {
  modelFruits
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("Server is ON");
});
