const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // check for existing user in database
    const user = await User.findOne({ email })

    // if the user doesn't already exist
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // validate password
    const isMatch = await bcrypt.compare(password, user.password);
    // if the password doesn't match
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin
          }
        });
      }
    );
  }
  catch (err) {
    res.status(400).json({ err, msg: "Login Failed" });
  }
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json({ user }));
});

module.exports = router;
