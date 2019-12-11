const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// item model
const User = require("../models/User");

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    //check for existing user
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      email,
      password
    });

    // Create salt and hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const user = await newUser.save();

    // json web token signature
    jwt.sign(
      //the payload
      { id: user.id },
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json({ err, msg: "Register Failed" });
  }
});

module.exports = router;
