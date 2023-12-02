const express = require("express");
const bCrypt = require("bcryptjs");
const router = express.Router();
const Users = require("../model/usersModel");

// REGISTERED
router.post("/DishoApi/User/create-user", (req, res) => {
  let { name, email, password } = req.body;
  Users.find({ email }).then((emailDuplicate) => {
    if (emailDuplicate.length) {
      res.status(400).json({ msg: "Acesso não autorizado" });
    } else {
      const salt = bCrypt.genSaltSync(10);
      const hash = bCrypt.hashSync(password, salt);
      password = hash;
      Users.create({ name, email, password }).then((ok) => {
        res.status(200).json({ msg: "Conta criada e usuário autenticado com sucesso!", token: ok._id });
      });
    }
  });
});

// LOGIN
router.post("/DishoApi/User/Login", async (req, res) => {
  const { email, password } = req.body;
  const existUser = await Users.findOne({ email });
  let decoderpassword = bCrypt.compareSync(password, existUser.password);
  existUser !== null && decoderpassword
    ? res.status(200).json({ msg: `Bem Vindo ${existUser.name}`, token: existUser._id })
    : res.status(400).json({ msg: "Usuário não encontrado ou senha inválida" });
});

// USER SEE PRODUCT IN YOUR CART
router.get("/DishoApi/User/get-cart/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userData = await Users.findById({ _id: userId });
  const totalValueBuy = userData.cart
    .map((item) => {
      return item.priceItem * item.qtd;
    })
    .reduce((oldValue, currentValue) => oldValue + currentValue, 0)
    .toFixed(2);
  res.status(200).json({ totalValueBuy, cart: userData.cart });
});

// SET PRODUCT IN CART
router.put("/DishoApi/User/set-cart/:userId", async (req, res) => {
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
// DELETE ITEM IN CART
router.delete("/DishoApi/User/delet-cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { idItem } = req.body;
  const findUser = await Users.findById({ _id: userId });
  const oldCart = findUser.cart;
  const idxItem = oldCart.findIndex((element) => element.idItem === idItem);
  oldCart.splice(idxItem, 1);
  const carrinhoNovo = [...oldCart];
  const updateCart = await Users.findById({ _id: userId }).updateOne({ cart: carrinhoNovo });
  res.send(oldCart);
});

module.exports = router;
