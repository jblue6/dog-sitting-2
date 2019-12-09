const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Prices = require("../models/Prices");

router.get("/", (req, res) => {
  Prices
    .find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ success: false }));
});

router.post("/", (req, res) => {
  const { prices } = req.body;

  prices.forEach(price => {
    const exists = price._id;
    const { description, basis, rate } = price;
    if (exists) {
      Prices
        .updateOne({ _id: price._id }, { description, basis, rate }, { upsert: true })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      const newPrices = new Prices({ description, basis, rate });
      newPrices
        .save()
    }
  });

  let existingPrices;
  Prices
    .find()
    .then(data => {
      existingPrices = data;
      res.json(existingPrices);
    });

});

module.exports = router;
