const express = require("express");
const router = express.Router();
const fruitsModel = require("../model/fruitsModel");

router.get("/DishoApi/fruits", async (req, res) => {
  const limit = 10;
  const page = req.query.page;

  const count = await fruitsModel.find({});
  let totalProducts = count.length;
  let totalPages = Math.ceil(totalProducts / limit);

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

router.get("/DishoApi/fruits/filter", async (req, res) => {
  const { nameItem, maxPrice, page } = req.query;

  const filterPrice = await fruitsModel
    .find()
    .where("price")
    .lte(maxPrice)
    .skip((page - 1) * 10)
    .then((product) => {
      const filterName = product.filter((item) => item.name.includes(nameItem));
      res.status(200).json({
        nextPage: Math.ceil(product.length / 10),
        totalItems: filterName.length,
        products: filterName,
        currentPage: page,
      });
    });
});

router.get("/DishoApi/fruits/:id", async (req, res) => {
  const { id } = req.params;
  const product = await fruitsModel.findById(id);
  res.json(product);
});

module.exports = router;
