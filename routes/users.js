const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../config/keys");
const passport = require("passport");
const ValidateLogin = require("../validation/login");
const validateRegister = require("../validation/register");
//Jwt Strategy and passport

router.get("/", (req, res) => {
  res.json({
    msg: "Users works",
  });
});

router.post("/new", (req, res) => {
  const { errors, valid } = validateRegister(req.body);
  if (!valid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.json({ msg: "user already exists" });
      } else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        //password encryption
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, newPass) => {
            if (err) throw err;
            user.password = newPass;
            user
              .save()
              .then((user) => {
                res.status(200).json({
                  user,
                });
              })
              .catch((err) => {
                return console.log(err);
              });
          });
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const { errors, valid } = ValidateLogin(req.body);
  if (!valid) {
    res.status(400).json(errors);
  } else {
    const password = req.body.password;
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((value) => {
            if (value) {
              //create payload
              const payload = { name: user.name, id: user.id };
              jwt.sign(payload, secret, { expiresIn: "7d" }, (err, token) => {
                res.json({ token: token, success: true });
              });
            } else {
              res.json({ msg: "Wrong password" });
            }
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    });
  }
);

module.exports = router;
