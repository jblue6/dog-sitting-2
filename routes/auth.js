const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // check for existing user in database
  User.findOne({ email }).then(user => {
    // if the user doesn't already exist
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      // if the password doesn't match
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

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
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
