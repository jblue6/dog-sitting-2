const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

router.get("/", (req, res) => {
  Contact
    .find()
    .then(data => res.json(data[0]))
    .catch(err => res.status(404).json({ success: false }));;
});

router.post("/", auth, (req, res) => {
  const newContact = new Contact({
    phone: req.body.phone,
    email: req.body.email
  });
  newContact
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(404));
});

router.put("/:id", auth, (req, res) => {
  const { phone, email } = req.body;
  Contact
    .updateOne({ _id: req.params.id }, { phone, email }, { upsert: true })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

router.delete("/:id", auth, (req, res) => {
  Contact
    .findById(req.params.id)
    .then(data => data.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;