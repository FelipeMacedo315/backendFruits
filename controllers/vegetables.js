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

module.exports = router;
