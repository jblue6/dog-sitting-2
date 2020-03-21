const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  numberOfDogs: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  status: {
    type: String
  }
});

module.exports = Booking = mongoose.model("booking", BookingSchema);