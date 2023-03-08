const express = require("express");
const router = express.Router();
const vegetablesModel = require("../model/vegetablesModel");

router.get("/DishoApi/vegetables", async (req, res) => {
  const limit = 10;
  const page = req.query.page;

  const count = await vegetablesModel.find({});
  let totalProducts = count.length;
  let totalPages = Math.ceil(totalProducts / limit);

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

router.get("/DishoApi/vegetables/filter", async (req, res) => {
  const { nameItem, maxPrice, page } = req.query;

  const filterPrice = await vegetablesModel
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

module.exports = router;
