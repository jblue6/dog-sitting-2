const express = require("express");
const router = express.Router();

const prices = [
  {
    id: 1,
    description: "Walking",
    basis: "Per Hour",
    rate: 10
  },
  {
    id: 2,
    description: "Day Sitting",
    basis: "Per Day",
    rate: 15
  },
  {
    id: 3,
    description: "Overnight",
    basis: "Per Night",
    rate: 25
  }
];

router.get("/", (req, res) => {
  res.json(prices);
});

module.exports = router;
