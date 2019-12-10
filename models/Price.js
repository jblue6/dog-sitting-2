const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  basis: {
    type: String,
    required: true
  }
});

module.exports = Price = mongoose.model("prices", PriceSchema);