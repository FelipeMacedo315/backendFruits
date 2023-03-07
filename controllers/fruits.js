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

module.exports = router;
