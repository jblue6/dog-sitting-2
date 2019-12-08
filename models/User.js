const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//creat schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    deault: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);