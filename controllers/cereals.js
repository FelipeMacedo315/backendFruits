const express = require("express");
const router = express.Router();
const cerealsModel = require("../model/cerealsModel");

// Find all product are cereals
router.get("/DishoApi/cereals", async (req, res) => {
  const limit = 10;
  const page = req.query.page;
  const count = await cerealsModel.find({});
  let totalProducts = count.length;
  let totalPages = Math.ceil(totalProducts / limit);
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

// Find products for filter
router.get("/DishoApi/cereals/filter", async (req, res) => {
  const { nameItem, maxPrice, page } = req.query;
  const filterPrice = await cerealsModel
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

// Find each product for id
router.get("/DishoApi/cereals/:id", async (req, res) => {
  const { id } = req.params;
  const product = await cerealsModel.findById(id);
  res.json(product);
});

module.exports = router;
