const express = require("express");
const Users = require("../model/usersModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.use(express.urlencoded({ extended: true }));

// User create a count
router.post("/DishoApi/create-user", (req, res) => {
  const { name, email, password } = req.body;
  Users.find({ email }).then((emailDuplicate) => {
    if (emailDuplicate.length) {
      res.status(400).json({ msg: "Acesso não autorizado" });
    } else {
      Users.create({ name, email, password })
        .then((ok) => {
          let token = jwt.sign(
            {
              idUser: ok._id,
            },
            "segredo",
            { expiresIn: "1d" }
          );
          res.status(200).json({ msg: "Conta criada e usuário autenticado com sucesso!", token });
        })
        .catch(() => res.status(400).json({ msg: "Senha ou email incorretos" }));
    }
  });
});

// User login

router.post("/DishoApi/login", (req, res) => {});

module.exports = router;
