const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const conn = require("./configDB/conn");
const modelFruits = require("./model/main");

const PORT = process.env.PORT || 3000;
// Send all fruits
app.get("/fruits", (req, res) => {
  modelFruits
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is ON in port:" + PORT);
});
