const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  update_date: {
    type: Date,
    deault: Date.now
  }
});

module.exports = Contact = mongoose.model("contact", ContactSchema);