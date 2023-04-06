const express = require("express");
const router = express.Router();
const Users = require("../model/usersModel");
const jwt = require("jsonwebtoken");
router.use(express.json());

// User create a count
router.post("/DishoApi/User/create-user", (req, res) => {
  const { name, email, password } = req.body;
  Users.find({ email }).then((emailDuplicate) => {
    if (emailDuplicate.length) {
      res.status(400).json({ msg: "Acesso não autorizado" });
    } else {
      Users.create({ name, email, password }).then((ok) => {
        // let token = jwt.sign(
        //   {
        //     idUser: ok._id,
        //   },
        //   "segredo",
        //   { expiresIn: "1d" }
        // );
        res.status(200).json({ msg: "Conta criada e usuário autenticado com sucesso!", token: ok._id });
      });
    }
  });
});

// User login
router.post("/DishoApi/User/Login", async (req, res) => {
  const { email, password } = req.body;
  const existUser = await Users.findOne({ email });
  existUser !== null && existUser.password === password
    ? res.status(200).json({ msg: `Bem Vindo ${existUser.name}`, token: existUser._id })
    : res.status(400).json({ msg: "Usuário não encontrado" });
});

// SET PRODUCT IN CART
router.post("/DishoApi/User/set-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const item = req.body;

  // verificar se já existe um item igual no carrinho
  const findUser = await Users.findById({ _id: userId });
  const oldCart = findUser.cart;
  const verItensDuplicados = oldCart.filter((element) => element.idItem === item.idItem);
  // ajustar as quantidades caso exista itens duplicados
  if (verItensDuplicados.length) {
    item.qtd += verItensDuplicados[0].qtd;
    const idxDuplicado = oldCart.findIndex((element) => element.idItem == item.idItem);
    oldCart.splice(idxDuplicado, 1);
    const carrinhoNovo = [item, ...oldCart];
    const setCart = await Users.findOneAndUpdate({ _id: userId }, { cart: carrinhoNovo }, { rawResult: true });
    res.status(200).json({ msg: "Carrinho atualizado" });
  } else {
    const setCart = await Users.findOneAndUpdate({ _id: userId }, { $push: { cart: item } }, { rawResult: true });
    res.status(200).json({ msg: "Carrinho atualizado" });
  }
});

// See all product are in cart
router.get("/DishoApi/User/get-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = await Users.findById({ _id: userId });
  const totalValueBuy = userData.cart
    .map((item) => {
      return item.priceItem * item.qtd;
    })
    .reduce((oldValue, currentValue) => {
      return oldValue + currentValue;
    })
    .toFixed(2);

  res.status(200).json({ totalValueBuy, cart: userData.cart });
});

module.exports = router;
