const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PricesSchema = new Schema({
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

module.exports = Prices = mongoose.model("prices", PricesSchema);