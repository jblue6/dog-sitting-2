const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  const userAuth = req.user;

  try {
    const response = await User.find().select("-password");
    const userFound = response.filter(user => user._id.equals(mongoose.Types.ObjectId(userAuth.id)))[0];
    res.json(userFound);
  } catch (err) {
    res.status(404);
  }
});

router.put("/", auth, async (req, res) => {
  const { user } = req;
  const { newUser } = req.body;
  const { id } = req.params;

  // try {
  //   const response = await Booking.findByIdAndUpdate(id, { status: action });
  //   const bookings = await Booking.find();
  //   res.json(bookings);
  // } catch (err) {
  //   res.status(404);
  // }
});

module.exports = router;