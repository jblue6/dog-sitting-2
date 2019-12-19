const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Price = require("../models/Price");

router.get("/", (req, res) => {
  Price
    .find()
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ success: false }));
});

router.post("/", auth, async (req, res) => {
  const { prices } = req.body;
  let changes = prices.length;
  const sendRes = () => res.json({ success: true });

  try {
    prices.forEach(async price => {
      const exists = !!price._id;
      const { description, basis, rate } = price;

      if (exists) {
        // update existing
        await Price.updateOne({ _id: price._id }, { description, basis, rate }, { upsert: true })
        changes--;
        if (changes === 0) sendRes();
      } else {
        // add new
        const newPrice = new Price({ description, basis, rate });
        prices.push(newPrice);
        await newPrice.save()
        changes--;
        if (changes === 0) sendRes();
      }
    });
  } catch (err) {
    res.status(404).json({ success: false });
  }

  try {
    const existingPrices = await Price.find();
    existingPrices.forEach(async price => {
      const { _id } = price;
      let inCurrent = false;

      prices.forEach(currentPrice => {
        if (currentPrice._id)
          if (currentPrice._id.toString() === _id.toString()) inCurrent = true;
      });

      if (!inCurrent) {
        const data = await Price.findById(_id);
        console.log(data);
        data.remove()
      }
    })
  } catch (err) {
    res.status(404).json({ success: false })
  }
});

module.exports = router;
