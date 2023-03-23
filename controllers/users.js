const express = require("express");
const Users = require("../model/usersModel");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post("/DishoApi/create-user", (req, res) => {
  const { name, email, password } = req.body;
  Users.create({ name, email, password })
    .then((ok) => {
      res.json({ welcome: "Bem vindo " + ok.name });
    })
    .catch((err) => res.json({ erro: "Houve algum erro" + err }));
});

module.exports = router;
