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

router.post("/", auth, (req, res) => {
  const { prices } = req.body;
  let changes = prices.length;

  const sendRes = () => res.json({ success: true });

  prices.forEach(price => {
    const exists = price._id;
    const { description, basis, rate } = price;

    if (exists) {
      // update existing
      Price
        .updateOne({ _id: price._id }, { description, basis, rate }, { upsert: true })
        .then(data => {
          changes--;
          if (changes === 0) sendRes();
        })
        .catch(err => res.status(404).json({ success: false }))
    } else {
      // add new
      const newPrices = new Price({ description, basis, rate });
      newPrices
        .save()
        .then(data => {
          changes--;
          if (changes === 0) sendRes();
        })
        .catch(err => res.status(404).json({ success: false }));
    }
  });

  Price
    .find()
    .then(existingPrices => {
      existingPrices.forEach(price => {
        const { _id } = price;

        let inCurrent = false;
        prices.forEach(currentPrice => {
          if (currentPrice._id)
            if (currentPrice._id.toString() === _id.toString()) inCurrent = true;
        });

        if (!inCurrent) {
          Price
            .findById(_id)
            .then(data => data.remove().then(() => {
              changes--;
            }))
            .catch(err => { });
        }
      })
    });

});

module.exports = router;
