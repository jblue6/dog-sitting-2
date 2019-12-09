const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Information = require("../models/Information");

router.get("/", (req, res) => {
  Information
    .find()
    .then(data => res.json(data[0]))
    .catch(err => res.status(404).json({ success: false }));;
});

router.post("/", (req, res) => {
  const newInformation = new Information({
    title: req.body.title,
    about: req.body.about
  });
  newInformation
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(404));
});

router.put("/:id", (req, res) => {
  const { title, about } = req.body;
  Information
    .updateOne({ _id: req.params.id }, { title, about }, { upsert: true })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

router.delete("/:id", (req, res) => {
  Information
    .findById(req.params.id)
    .then(data => data.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;