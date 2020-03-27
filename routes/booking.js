const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const auth = require("../middleware/auth");
const Booking = require("../models/Booking");

router.post("/", auth, async (req, res) => {
  const { user, body } = req;
  const { startDate, endDate, numberOfDogs, service, notes } = body;
  const booking = new Booking({
    user: mongoose.Types.ObjectId(user.id),
    startDate: createDate(startDate),
    endDate: createDate(endDate),
    endDate: createDate(endDate),
    numberOfDogs: numberOfDogs,
    service: service,
    notes: notes,
    status: "Pending"
  });

  try {
    const response = await booking.save();
    res.json(response);
  } catch (err) {
    res.status(404);
  }
});

router.put("/approve/:id", auth, async (req, res) => {
  const { user } = req;
  const { action } = req.body;
  const { id } = req.params;

  if (!user.isAdmin) res.status(404);

  try {
    const response = await Booking.findByIdAndUpdate(id, { status: action });
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(404);
  }
});

router.get("/", auth, async (req, res) => {
  const { user } = req;

  try {
    const response = await Booking.find();
    const bookings = response.filter(booking => booking.user.equals(mongoose.Types.ObjectId(user.id)));
    res.json(bookings);
  } catch (err) {
    res.status(404);
  }
});

router.get("/all", auth, async (req, res) => {
  const { user } = req;

  if (!user.isAdmin) res.json([]);

  try {
    const response = await Booking.find().populate("user");
    res.json(response);
  } catch (err) {
    res.status(404);
  }
});

function createDate(dateString) {
  const day = parseInt(dateString.split("-")[2]);
  const month = parseInt(dateString.split("-")[1]);
  const year = parseInt(dateString.split("-")[0]);

  return new Date(year, month, day);
}

module.exports = router;