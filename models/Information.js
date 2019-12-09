const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InformationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  update_date: {
    type: Date,
    deault: Date.now
  }
});

module.exports = Information = mongoose.model("information", InformationSchema);