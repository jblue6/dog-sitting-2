const express = require("express");
const router = express.Router();

const information = {
  title: "Blue dog sitting",
  about: "Blue dog sitting provide dog walking and sitting services"
}

router.get("/", (req, res) => {
  res.json(information);
});


module.exports = router;